using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class RoleService : IRoleService
{
    private readonly ILogger<RoleService> _logger;
    private readonly IRoleRepository _roleRepository;

    public RoleService(ILogger<RoleService> logger, IRoleRepository roleRepository)
    {
        _logger = logger;
        _roleRepository = roleRepository;
    }
    
    public async Task<List<HomeRolePermission>> GetHomePermissionsByRoleId(int homeRoleId)
    {
        var homeRolePermissions = await _roleRepository.GetHomePermissionsByRoleId(homeRoleId);
        return homeRolePermissions;
    }
}