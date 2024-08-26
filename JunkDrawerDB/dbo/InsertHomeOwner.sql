CREATE procedure InsertHomeOwner
      @userId nvarchar(250) = null
    , @homeId int = null
    , @displayName nvarchar(max) = null
as
begin
    begin transaction;

    insert into dbo.homeOwner (userId, homeId, displayName)
    values (@userId, @homeId, @displayName)

    commit transaction;
end
go

