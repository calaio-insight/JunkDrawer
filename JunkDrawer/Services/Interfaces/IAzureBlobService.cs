namespace JunkDrawer.Services.Interfaces;

public interface IAzureBlobService
{
    Task<string> UploadBlobAsync(IFormFile file, string imageName, int homeId);
}