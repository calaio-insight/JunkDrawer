using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class HomeService : IHomeService
{
    private readonly ILogger<HomeService> _logger;
    private readonly IHomeRepository _homeRepository;
    private readonly ITrustedNeighborRepository _trustedNeighborRepository;

    public HomeService(ILogger<HomeService> logger, IHomeRepository homeRepository, ITrustedNeighborRepository trustedNeighborRepository)
    {
        _logger = logger;
        _homeRepository = homeRepository;
        _trustedNeighborRepository = trustedNeighborRepository;
    }

    public async Task<List<Home>> GetHomesByUserId(int userId)
    {
        var homes = await _homeRepository.GetHomesByUserId(userId);
        foreach (var home in homes)
        {
            home.TrustedNeighbors = await _trustedNeighborRepository.GetTrustedNeighborsByHomeId(home.HomeId);
        }
        return homes;
    }

    public async Task<Home?> GetHomeById(int id)
    {
        var home = await _homeRepository.GetHomeById(id);
        if (home != null)
        {
            home.TrustedNeighbors = await _trustedNeighborRepository.GetTrustedNeighborsByHomeId(home.HomeId);
        }
        return home;
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
}