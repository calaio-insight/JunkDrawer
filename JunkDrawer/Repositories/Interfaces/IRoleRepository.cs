using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface IRoleRepository
{
    Task<List<HomeRolePermission>> GetHomePermissionsByRoleId(int homeRoleId);
}