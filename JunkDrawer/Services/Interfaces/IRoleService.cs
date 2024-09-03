using JunkDrawer.Enums;

namespace JunkDrawer.Services.Interfaces;

public interface IRoleService
{
    Task<List<HomePermissionType>> GetHomePermissionsByRoleId(HomeRoleType homeRole);
}