using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class TrustedNeighborRepository : ITrustedNeighborRepository
{
    private readonly ILogger<TrustedNeighborRepository> _logger;
    private readonly string _connString;

    public TrustedNeighborRepository(IConfiguration config, ILogger<TrustedNeighborRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }
   
    public async Task<List<TrustedNeighbor>> GetTrustedNeighborsByHomeId(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        var homeOwners = await connection.QueryAsync<TrustedNeighbor>(Procedures.GetTrustedNeighborsByHomeId, parameters, commandType: CommandType.StoredProcedure);
        return homeOwners.ToList();
    }
    
    public async Task InsertTrustedNeighbor(TrustedNeighbor trustedNeighbor, int currentUserId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", trustedNeighbor.HomeId);
        parameters.Add("@userId", trustedNeighbor.UserId);
        parameters.Add("@roleId", (int)trustedNeighbor.RoleType);
        parameters.Add("@currentUserId", currentUserId);
        await connection.ExecuteScalarAsync<int>(Procedures.InsertTrustedNeighbor, parameters, commandType: CommandType.StoredProcedure);
    }
    
    public async Task<bool> DeleteTrustedNeighborsByHomeId(int homeId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeId", homeId);
        try
        {
            await connection.ExecuteScalarAsync<int>(Procedures.DeleteTrustedNeighborsByHomeId, parameters,
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