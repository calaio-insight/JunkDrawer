﻿namespace JunkDrawer.Constants;

public static class Procedures
{
    public const string GetUserByEmail = "[dbo].[GetUserByEmail]";
    public const string GetUserById = "[dbo].[GetUserById]";
    public const string InsertUser = "[dbo].[InsertUser]";
    
    public const string GetAllHomes = "[dbo].[GetAllHomes]";
    public const string GetHomesByUserId = "[dbo].[GetHomesByUserId]";
    public const string GetHomeById = "[dbo].[GetHomeById]";
    public const string UpsertHome = "[dbo].[UpsertHome]";
    public const string UpdateHomeImage = "[dbo].[UpdateHomeImage]";
    
    public const string GetHomeItemsByHomeId = "[dbo].[GetHomeItemsByHomeId]";
    public const string GetHomeItemById = "[dbo].[GetHomeItemById]";
    public const string UpsertHomeItem =  "[dbo].[UpsertHomeItem]";
    public const string UpdateHomeItemImage = "[dbo].[UpdateHomeItemImage]";
    
    public const string GetTrustedNeighborsByHomeId = "[dbo].[GetTrustedNeighborsByHomeId]";
    public const string InsertTrustedNeighbor = "[dbo].[InsertTrustedNeighbor]";
    public const string DeleteTrustedNeighborsByHomeId = "[dbo].[DeleteTrustedNeighborsByHomeId]";
    
    public const string GetUserTrustedNeighborsByUserId = "[dbo].[GetUserTrustedNeighborsByUserId]";
    public const string InsertUserTrustedNeighbor = "[dbo].[InsertUserTrustedNeighbor]";
    public const string DeleteUserTrustedNeighbor = "[dbo].[DeleteUserTrustedNeighbor]";
    
    public const string GetHomePermissionsByRoleId = "[dbo].[GetHomePermissionsByRoleId]";
}