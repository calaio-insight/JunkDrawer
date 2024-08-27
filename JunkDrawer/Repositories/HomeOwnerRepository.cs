using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class HomeOwnerRepository : IHomeOwnerRepository
{
    private readonly ILogger<HomeOwnerRepository> _logger;
    private readonly string _connString;

    public HomeOwnerRepository(IConfiguration config, ILogger<HomeOwnerRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }
   
    public async Task<List<HomeOwner>> GetHomeOwnersByHomeId(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        var homeOwners = await connection.QueryAsync<HomeOwner>(Procedures.GetHomeOwnersByHomeId, parameters, commandType: CommandType.StoredProcedure);
        return homeOwners.ToList();
    }
    
    public async Task InsertHomeOwner(HomeOwner homeOwner)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeOwner.HomeId);
        parameters.Add("@userId", homeOwner.UserId);
        parameters.Add("@displayName", homeOwner.DisplayName);
        await connection.ExecuteScalarAsync<int>(Procedures.InsertHomeOwner, parameters, commandType: CommandType.StoredProcedure);
    }
    
    public async Task<bool> DeleteHomeOwnersByHomeId(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        try
        {
            await connection.ExecuteScalarAsync<int>(Procedures.DeleteHomeOwnersByHomeId, parameters,
                commandType: CommandType.StoredProcedure);
            return true;
        }
        catch (SqlException ex)
        {
            _logger.LogError(ex, ex.Message);
            return false;
        }
        
    }
    
}