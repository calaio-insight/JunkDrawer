using Azure.Identity;
using JunkDrawer.Interfaces;
using Microsoft.Graph;
using Microsoft.Graph.Models;

namespace JunkDrawer.Services;

public class GraphApiService : IGraphApiService
{
    private readonly string                   _tenantId;
    private readonly string                   _clientId;
    private readonly string                   _clientSecret;
    private readonly GraphServiceClient       _graphClient;
    private readonly ILogger<GraphApiService> _logger;

    public GraphApiService(ILogger<GraphApiService> logger, IConfiguration config)
    {
        _logger       = logger;
        _tenantId     = config.GetSection("AzureAd:TenantId").Value     ?? "";
        _clientId     = config.GetSection("AzureAd:ClientId").Value     ?? "";
        _clientSecret = config.GetSection("AzureAd:ClientSecret").Value ?? "";
        
        _graphClient = CreateGraphClient();
    }
    
    private GraphServiceClient CreateGraphClient()
    {
        try
        {
            var scopes = new[] { "https://graph.microsoft.com/.default" };
            var options = new ClientSecretCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
            };
            
            var clientSecretCredential = new ClientSecretCredential(
                _tenantId, _clientId, _clientSecret, options);
            
            return new GraphServiceClient(clientSecretCredential, scopes);
        }
        catch (Exception e)
        {
            var errorMessage = $"CreateGraphClient - Could not create Microsoft Graph Service Client: {e}";
            _logger.LogError(errorMessage);
            throw new Exception(errorMessage);
        }
    }
    
    /// <inheritdoc />
    public async Task<string> GetUserIdByEmail(string userEmail)
    {
        try
        {
            var userObjectId = string.Empty;
            var users = await _graphClient.Users.GetAsync((requestConfiguration) =>
            {
                requestConfiguration.QueryParameters.Filter = $"mail eq '{userEmail}'";
            });
            if (users != null && users.Value!.Count > 0)
            {
                userObjectId = users.Value[0].Id;
            }
            return userObjectId!;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "User doesn't exist in AD");
            throw;
        }
    }
    
    /// <inheritdoc />
    public async Task<User> GetUserById(string userId)
    {
        var result = await _graphClient.Users[userId].GetAsync();
        return result ?? throw new NullReferenceException($"Invalid User Id {userId} in tenant {_tenantId}");
    }
}