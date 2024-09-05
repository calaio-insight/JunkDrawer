using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class HomeItemRepository : IHomeItemRepository
{
    private readonly ILogger<HomeItemRepository> _logger;
    private readonly string _connString;

    public HomeItemRepository(IConfiguration config, ILogger<HomeItemRepository> logger)
    {
        _logger         = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }
    
    public async Task<List<HomeItem>> GetHomeItemsByHomeId(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        var homeItems = await connection.QueryAsync<HomeItem>(Procedures.GetHomeItemsByHomeId, parameters, commandType: CommandType.StoredProcedure);
        return homeItems.ToList();
    }

    public async Task<HomeItem?> GetHomeItemById(int homeItemId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeItemId", homeItemId);
        var homeItem = await connection.QueryFirstOrDefaultAsync<HomeItem>(Procedures.GetHomeItemById, parameters, commandType: CommandType.StoredProcedure);
        return homeItem;
    }
    
    public async Task<int?> UpsertHomeItem(HomeItem homeItem, int currentUserId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        if (homeItem.HomeItemId != 0)
        {
            parameters.Add("@homeItemId", homeItem.HomeItemId);
        }
        parameters.Add("@homeId", homeItem.HomeId);
        parameters.Add("@itemName", homeItem.ItemName);
        parameters.Add("@itemPhoto", homeItem.ItemPhoto);
        parameters.Add("@purchaseDate", homeItem.PurchaseDate);
        parameters.Add("@purchasePrice", homeItem.PurchasePrice);
        parameters.Add("@maintenanceDate", homeItem.MaintenanceDate);
        parameters.Add("@maintenanceCost", homeItem.MaintenanceCost);
        parameters.Add("@notes", homeItem.Notes);
        parameters.Add("@modifiedBy", currentUserId);
        parameters.Add("@modifiedDate", DateTime.Now);

        if (homeItem.HomeItemId == 0)
        {
            parameters.Add("@createdBy", currentUserId);
            parameters.Add("@createdDate", DateTime.Now);
        }
        
        var updatedHomeItemId = await connection.ExecuteScalarAsync<int>(Procedures.UpsertHomeItem, parameters, commandType: CommandType.StoredProcedure);
        return updatedHomeItemId;
    }
    
    public async Task UpdateHomeItemImage(int homeItemId, int currentUserId, string imagePath)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeItemId", homeItemId);
        parameters.Add("@modifiedBy", currentUserId);
        parameters.Add("@modifiedDate", DateTime.Now);
        parameters.Add("@itemPhoto", imagePath);
        
        await connection.ExecuteScalarAsync<int>(Procedures.UpdateHomeItemImage, parameters, commandType: CommandType.StoredProcedure);
    }
    
    //todo delete home item
}