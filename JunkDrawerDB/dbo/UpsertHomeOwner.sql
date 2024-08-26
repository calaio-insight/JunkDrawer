create procedure UpsertHomeOwner
      @homeOwnerId int = null
    , @userId nvarchar(250) = null
    , @homeId int = null
    , @displayName nvarchar(max) = null
as
begin
    begin transaction;

    update dbo.homeOwner
    set
          userId = isnull(@userId, userId)
        , homeId = isnull(@homeId, homeId)
        , displayName = isnull(@displayName, displayName)
    where homeOwnerId = @homeOwnerId

    if @@rowcount = 0
        insert into dbo.homeOwner (userId, homeId, displayName)
        values (@userId, @homeId, @displayName)

    commit transaction;
end
go

