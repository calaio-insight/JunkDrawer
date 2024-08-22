using Microsoft.Graph.Models;

namespace JunkDrawer.Interfaces;

public interface IGraphApiService
{
    /// <summary>
    /// Get ID of a user using email address from the Active Directory
    /// </summary>
    /// <param name="userEmail"></param>
    /// <returns></returns>
    Task<string> GetUserIdByEmail(string userEmail);
    
    /// <summary>
    /// Given a user id, fetch the user details from the Active Directory
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<User> GetUserById(string userId);
}