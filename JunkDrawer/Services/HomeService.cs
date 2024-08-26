using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class HomeService : IHomeService
{
    private readonly ILogger<HomeService> _logger;
    private readonly IHomeRepository _homeRepository;
    private readonly IHomeOwnerRepository _homeOwnerRepository;

    public HomeService(ILogger<HomeService> logger, IHomeRepository homeRepository, IHomeOwnerRepository homeOwnerRepository)
    {
        _logger = logger;
        _homeRepository = homeRepository;
        _homeOwnerRepository = homeOwnerRepository;
    }

    public async Task<List<Home>> GetHomesByUserId(string userId)
    {
        var homes = await _homeRepository.GetHomesByUserId(userId);
        foreach (var home in homes)
        {
            home.HomeOwners = await _homeOwnerRepository.GetHomeOwnersByHomeId(home.HomeId);
        }
        
        return homes;
    }

    public async Task<Home?> GetHomeById(int id)
    {
        var home = await _homeRepository.GetHomeById(id);
        if (home != null)
        {
            home.HomeOwners = await _homeOwnerRepository.GetHomeOwnersByHomeId(home.HomeId);
        }
        return home;
    }

    public async Task<int?> UpsertHome(Home home, string currentUserId)
    {
        // Insert/Update home
        var homeId = await _homeRepository.UpsertHome(home, currentUserId);
        
        // Clear and re-insert homeowners list
        await _homeOwnerRepository.DeleteHomeOwnersByHomeId(home.HomeId);
        foreach (var owner in home.HomeOwners)
        {
            await _homeOwnerRepository.InsertHomeOwner(owner);
        }
        
        return homeId;
    }
}