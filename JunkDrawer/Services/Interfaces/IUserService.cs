using JunkDrawer.Entities.Auth;

namespace JunkDrawer.Services.Interfaces;

public interface IUserService
{
    Task<User?> GetUserByEmail(string userEmail);
    Task<User?> GetUserById(int userId);
    Task<int?> InsertUser(User user);
}