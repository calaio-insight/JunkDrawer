using JunkDrawer.Entities;

namespace JunkDrawer.Services.Interfaces;

public interface IHomeItemService
{
    Task<List<HomeItem>> GetHomeItemsByHomeId(int homeId);
    Task<HomeItem?> GetHomeItemById(int homeItemId);
    Task<int?> UpsertHomeItem(HomeItem homeItem, int currentUserId);
    Task UpdateHomeItemImage(int homeItemId, int currentUserId, string imagePath);
}