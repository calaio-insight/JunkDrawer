CREATE procedure DeleteUserTrustedNeighbor
      @userTrustedNeighborId int
    , @userId int
as
begin
    begin transaction;

    --Delete any records referencing this user's trusted neighbor from their homes
    delete from trustedNeighbor
    where trustedNeighborId in (
        select tn.trustedNeighborId
        from home h
                 join trustedNeighbor tn on h.homeId = tn.homeId
        where h.createdBy = @userId
    )

    --Delete record from this user's trusted neighbors
    delete from userTrustedNeighbor
    where userTrustedNeighborId = @userTrustedNeighborId

    commit transaction;
end
go

