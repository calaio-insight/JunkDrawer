using JunkDrawer.Entities;

namespace JunkDrawer.Services.Interfaces;

public interface IHomeService
{
    Task<List<Home>> GetHomesByUserId(string userId);
    Task<Home?> GetHomeById(int id);
    Task<int?> UpsertHome(Home home, string currentUserId);
}