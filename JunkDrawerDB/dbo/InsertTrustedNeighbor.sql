CREATE procedure InsertTrustedNeighbor
@userId int = null
, @homeId int = null
as
begin
    begin transaction;

    insert into dbo.trustedNeighbor (userId, homeId)
    values (@userId, @homeId)

    commit transaction;
end
go

