using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class HomeRepository : IHomeRepository
{
    private readonly ILogger<HomeRepository> _logger;
    private readonly string _connString;

    public HomeRepository(IConfiguration config, ILogger<HomeRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }

    //Gets all homes user has created or is a "trusted neighbor" for
    public async Task<List<Home>> GetHomesByUserId(int userId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userId", userId);
        var homes = await connection.QueryAsync<Home>(Procedures.GetHomesByUserId, parameters, commandType: CommandType.StoredProcedure);
        return homes.ToList();
    }
    
    public async Task<Home?> GetHomeById(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        var home = await connection.QueryFirstOrDefaultAsync<Home>(Procedures.GetHomeById, parameters, commandType: CommandType.StoredProcedure);
        return home;
    }
    
    public async Task<int?> UpsertHome(Home home, int currentUserId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        if (home.HomeId != 0)
        {
            parameters.Add("@homeId", home.HomeId);
        }
        parameters.Add("@homeName", home.HomeName);
        parameters.Add("@homePhoto", home.HomePhoto);
        parameters.Add("@address", home.Address);
        parameters.Add("@address2", home.Address2);
        parameters.Add("@city", home.City);
        parameters.Add("@state", home.State);
        parameters.Add("@zip", home.Zip);
        parameters.Add("@purchaseDate", home.PurchaseDate);
        parameters.Add("@purchasePrice", home.PurchasePrice);
        parameters.Add("@notes", home.Notes);
        parameters.Add("@modifiedBy", currentUserId);
        parameters.Add("@modifiedDate", DateTime.Now);

        if (home.HomeId == 0)
        {
            parameters.Add("@createdBy", currentUserId);
            parameters.Add("@createdDate", DateTime.Now);
        }
        
        var updatedHomeId = await connection.ExecuteScalarAsync<int>(Procedures.UpsertHome, parameters, commandType: CommandType.StoredProcedure);
        return updatedHomeId;
    }
    
    //TODO: DeleteHome

    public async Task UpdateHomeImage(int homeId, int currentUserId, string imagePath)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        parameters.Add("@modifiedBy", currentUserId);
        parameters.Add("@modifiedDate", DateTime.Now);
        parameters.Add("@homePhoto", imagePath);
        
        await connection.ExecuteScalarAsync<int>(Procedures.UpdateHomeImage, parameters, commandType: CommandType.StoredProcedure);
    }
}