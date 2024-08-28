CREATE procedure InsertUserTrustedNeighbor
      @userId int
    , @trustedUserId int
as
begin
    begin transaction;

    insert into dbo.userTrustedNeighbor (userId, trustedUserId)
    values (@userId, @trustedUserId)

    select SCOPE_IDENTITY();

    commit transaction;
end
go

