using JunkDrawer.Entities.Auth;

namespace JunkDrawer.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetUserByEmail(string userEmail);
    Task<User?> GetUserById(int userId);
    Task<int?> InsertUser(User user);
}