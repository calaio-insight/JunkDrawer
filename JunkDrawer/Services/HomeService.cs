using JunkDrawer.Entities;
using JunkDrawer.Enums;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class HomeService : IHomeService
{
    private readonly ILogger<HomeService> _logger;
    private readonly IRoleService _roleService;
    private readonly IHomeRepository _homeRepository;
    private readonly ITrustedNeighborRepository _trustedNeighborRepository;

    public HomeService(ILogger<HomeService> logger, IHomeRepository homeRepository, ITrustedNeighborRepository trustedNeighborRepository, IRoleService roleService)
    {
        _logger = logger;
        _homeRepository = homeRepository;
        _trustedNeighborRepository = trustedNeighborRepository;
        _roleService = roleService;
    }

    public async Task<List<Home>> GetHomesByUserId(int userId)
    {
        var homes = await _homeRepository.GetHomesByUserId(userId);
        foreach (var home in homes)
        {
            home.TrustedNeighbors = await _trustedNeighborRepository.GetTrustedNeighborsByHomeId(home.HomeId);
            await GetRoleForHome(home, userId);
        }
        return homes;
    }

    public async Task<Home?> GetHomeById(int id, int currentUserId)
    {
        var home = await _homeRepository.GetHomeById(id);
        if (home != null)
        {
            home.TrustedNeighbors = await _trustedNeighborRepository.GetTrustedNeighborsByHomeId(home.HomeId);
            await GetRoleForHome(home, currentUserId);
        }
        return home;
    }

    private async Task GetRoleForHome(Home home, int currentUserId)
    {
        if (home.CreatedBy == currentUserId)
        {
            //Is owner
            home.Role = HomeRoleType.Owner;
        }
        else
        {
            //Get role if not owner
            var currentRole = home.TrustedNeighbors?.Find(x => x.TrustedNeighborId == currentUserId)?.RoleType;
            home.Role = currentRole ?? HomeRoleType.Viewer;
        }
        
        //Get permissions
        home.Permissions = await _roleService.GetHomePermissionsByRoleId(home.Role ?? HomeRoleType.Viewer);
    }

    public async Task<int?> UpsertHome(Home home, int currentUserId)
    {
        // Insert/Update home
        var homeId = await _homeRepository.UpsertHome(home, currentUserId);
        
        // Clear and re-insert trustedNeighbors list
        if (homeId != null)
        {
            await _trustedNeighborRepository.DeleteTrustedNeighborsByHomeId(home.HomeId);
            foreach (var neighbor in home.TrustedNeighbors)
            {
                neighbor.HomeId = (int)homeId;
                await _trustedNeighborRepository.InsertTrustedNeighbor(neighbor, currentUserId);
            }
        }

        return homeId;
    }

    public async Task UpdateHomeImage(int homeId, int currentUserId, string imagePath)
    {
        await _homeRepository.UpdateHomeImage(homeId, currentUserId, imagePath);
    }
}