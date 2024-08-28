create procedure DeleteTrustedNeighborsByHomeId
@homeId int
as
begin
    begin transaction;

    delete from trustedNeighbor
    where homeId = @homeId

    commit transaction;
end
go

