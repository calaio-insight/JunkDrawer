using JunkDrawer.Entities;
using JunkDrawer.Repositories.Interfaces;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class HomeItemService : IHomeItemService
{
    private readonly ILogger<HomeItemService> _logger;
    private readonly IHomeItemRepository _homeItemRepository;

    public HomeItemService(ILogger<HomeItemService> logger, IHomeItemRepository homeItemRepository)
    {
        _logger = logger;
        _homeItemRepository = homeItemRepository;
    }
    
    public async Task<List<HomeItem>> GetHomeItemsByHomeId(int homeId)
    {
        var homeItems = await _homeItemRepository.GetHomeItemsByHomeId(homeId);
        return homeItems;
    }
    
    public async Task<HomeItem?> GetHomeItemById(int homeItemId)
    {
        var homeItem = await _homeItemRepository.GetHomeItemById(homeItemId);
        return homeItem;
    }
    
    public async Task<int?> UpsertHomeItem(HomeItem homeItem, int currentUserId)
    {
        var homeItemId = await _homeItemRepository.UpsertHomeItem(homeItem, currentUserId);
        return homeItemId;
    }

    public async Task UpdateHomeItemImage(int homeItemId, int currentUserId, string imagePath)
    {
        await _homeItemRepository.UpdateHomeItemImage(homeItemId, currentUserId, imagePath);
    } 
}