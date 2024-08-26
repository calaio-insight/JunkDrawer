namespace JunkDrawer.Constants;

public static class Procedures
{
    public const string GetAllHomes = "[dbo].[GetAllHomes]";
    public const string GetHomesByUserId = "[dbo].[GetHomesByUserId]";
    public const string GetHomeById = "[dbo].[GetHomeById]";
    public const string GetHomeOwnersByHomeId = "[dbo].[GetHomeOwnersByHomeId]";
    public const string UpsertHome = "[dbo].[UpsertHome]";
    public const string InsertHomeOwner = "[dbo].[InsertHomeOwner]";
    public const string DeleteHomeOwnersByHomeId = "[dbo].[DeleteHomeOwnersByHomeId]";
}