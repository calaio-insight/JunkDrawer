CREATE procedure InsertTrustedNeighbor
      @userId int = null
    , @homeId int = null
    , @roleId int = null
    , @currentUserId int = null
as
begin
    begin transaction;

    insert into dbo.trustedNeighbor (userId, homeId, roleId, createdBy, modifiedBy)
    values (@userId, @homeId, @roleId, @currentUserId, @currentUserId)

    commit transaction;
end
go

