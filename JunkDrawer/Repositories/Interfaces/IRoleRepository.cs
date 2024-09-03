using JunkDrawer.Enums;

namespace JunkDrawer.Repositories.Interfaces;

public interface IRoleRepository
{
    Task<List<HomePermissionType>> GetHomePermissionsByRoleId(HomeRoleType homeRole);
}