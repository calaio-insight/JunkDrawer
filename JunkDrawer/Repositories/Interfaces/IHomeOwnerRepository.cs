using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface IHomeOwnerRepository
{
    Task<List<HomeOwner>> GetHomeOwnersByHomeId(int homeId);
    Task InsertHomeOwner(HomeOwner homeOwner);
    Task<bool> DeleteHomeOwnersByHomeId(int homeId);
}