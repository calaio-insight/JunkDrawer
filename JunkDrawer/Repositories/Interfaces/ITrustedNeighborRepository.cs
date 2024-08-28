using JunkDrawer.Entities;

namespace JunkDrawer.Repositories.Interfaces;

public interface ITrustedNeighborRepository
{
    Task<List<TrustedNeighbor>> GetTrustedNeighborsByHomeId(int homeId);
    Task InsertTrustedNeighbor(TrustedNeighbor trustedNeighbor);
    Task<bool> DeleteTrustedNeighborsByHomeId(int homeId);
}