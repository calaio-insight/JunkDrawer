using JunkDrawer.Entities;

namespace JunkDrawer.Services.Interfaces;

public interface IRoleService
{
    Task<List<HomeRolePermission>> GetHomePermissionsByRoleId(int homeRoleId);
}