using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Entities;
using JunkDrawer.Entities.Auth;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ILogger<UserRepository> _logger;
    private readonly string _connString;

    public UserRepository(IConfiguration config, ILogger<UserRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }

    public async Task<User?> GetUserByEmail(string userEmail)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userEmail", userEmail);
        var user = await connection.QueryFirstOrDefaultAsync<User>(Procedures.GetUserByEmail, parameters, commandType: CommandType.StoredProcedure);
        return user;
    }
    
    public async Task<User?> GetUserById(int userId)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@userId", userId);
        var user = await connection.QueryFirstOrDefaultAsync<User>(Procedures.GetUserById, parameters, commandType: CommandType.StoredProcedure);
        return user;
    }
    
    public async Task<int?> InsertUser(User user)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@email", user.Email);
        parameters.Add("@firstName", user.FirstName);
        parameters.Add("@lastName", user.LastName);
        parameters.Add("@displayName", user.DisplayName);
        parameters.Add("@photoUrl", user.PhotoUrl);
        
        var createdUserId = await connection.ExecuteScalarAsync<int>(Procedures.InsertUser, parameters, commandType: CommandType.StoredProcedure);
        return createdUserId;
    }
    
    
}