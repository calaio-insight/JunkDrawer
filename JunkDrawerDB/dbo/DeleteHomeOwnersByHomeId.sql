create procedure DeleteHomeOwnersByHomeId
    @homeId int
as
begin
    begin transaction;

    delete from homeOwner
    where homeId = @homeId

    commit transaction;
end
go

