using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class UserTrustedNeighborRepository : IUserTrustedNeighborRepository
{
    private readonly ILogger<UserTrustedNeighborRepository> _logger;
    private readonly string _connString;

    public UserTrustedNeighborRepository(IConfiguration config, ILogger<UserTrustedNeighborRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }
   
    public async Task<List<UserTrustedNeighbor>> GetUserTrustedNeighborsByUserId(int userId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userId", userId);
        var userTrustedNeighbors = await connection.QueryAsync<UserTrustedNeighbor>(Procedures.GetUserTrustedNeighborsByUserId, parameters, commandType: CommandType.StoredProcedure);
        return userTrustedNeighbors.ToList();
    }
    
    public async Task<int?> InsertUserTrustedNeighbor(UserTrustedNeighbor userTrustedNeighbor)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userId", userTrustedNeighbor.UserId);
        parameters.Add("@trustedUserId", userTrustedNeighbor.TrustedUserId);
        
        var createdUserTrustedNeighborId = await connection.ExecuteScalarAsync<int>(Procedures.InsertUserTrustedNeighbor, parameters, commandType: CommandType.StoredProcedure);
        return createdUserTrustedNeighborId;
    }
    
    public async Task DeleteUserTrustedNeighbor(int userTrustedNeighborId, int currentUserId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userTrustedNeighborId", userTrustedNeighborId);
        parameters.Add("@userId", currentUserId);
        
        await connection.ExecuteScalarAsync<int>(Procedures.DeleteUserTrustedNeighbor, parameters, commandType: CommandType.StoredProcedure);
    }
    
    
}