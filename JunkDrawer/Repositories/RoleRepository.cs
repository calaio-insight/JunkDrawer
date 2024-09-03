using System.Data;
using Dapper;
using JunkDrawer.Constants;
using JunkDrawer.Enums;
using JunkDrawer.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace JunkDrawer.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly ILogger<RoleRepository> _logger;
    private readonly string _connString;

    public RoleRepository(IConfiguration config, ILogger<RoleRepository> logger)
    {
        _logger       = logger;
        _connString     = config.GetSection("Sql:ConnectionString").Value ?? "";
    }
    
    public async Task<List<HomePermissionType>> GetHomePermissionsByRoleId(HomeRoleType homeRole)
    {
        await using SqlConnection connection = new (_connString);
        
        await connection.OpenAsync();
        DynamicParameters parameters = new();
        parameters.Add("@homeRoleId", homeRole);
        var homeRolePermissions = await connection.QueryAsync<HomePermissionType>(Procedures.GetHomePermissionsByRoleId, parameters, commandType: CommandType.StoredProcedure);
        return homeRolePermissions.ToList();
    }
}