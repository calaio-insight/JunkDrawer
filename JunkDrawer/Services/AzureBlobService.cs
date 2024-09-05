using Azure.Identity;
using Azure.Storage.Blobs;
using JunkDrawer.Services.Interfaces;

namespace JunkDrawer.Services;

public class AzureBlobService : IAzureBlobService
{
    private readonly ILogger<AzureBlobService> _logger;
    private readonly string _storageAccountName;
    private readonly string _storageConnectionString;
    private readonly BlobServiceClient _blobServiceClient;
    
    public AzureBlobService(ILogger<AzureBlobService> logger, IConfiguration config)
    {
        _logger = logger;
        _storageAccountName     = config.GetSection("Storage:AccountName").Value ?? "";
        _storageConnectionString = config.GetSection("Storage:ConnectionString").Value ?? "";
        _blobServiceClient      = GetBlobServiceClient();
    }
    
    private BlobServiceClient GetBlobServiceClient()
    {
        BlobServiceClient client = new(_storageConnectionString);
        return client;
    }
    
    //Upload image
    public async Task<string> UploadBlobAsync(IFormFile file, string imageName, int homeId)
    {
        //Create or find container for home
        var containerName = "home-" + homeId;
        var container = _blobServiceClient.GetBlobContainerClient(containerName);
        await container.CreateIfNotExistsAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
        
        var blob = container.GetBlobClient(imageName);
        await using var stream = file.OpenReadStream();
        var upload = await blob.UploadAsync(stream, overwrite: true);
        if (upload.GetRawResponse().Status != 201)
        {
            throw new Exception("Upload failed, status: " + upload.GetRawResponse().Status);
        }
        
        return "https://" + _storageAccountName + ".blob.core.windows.net/" + containerName + "/" + imageName;
    }
}