create procedure GetHomeOwnersByHomeId
    @homeId int
as
select
       ho.homeownerid
     , ho.userid
     , ho.homeid
     , ho.displayName
from dbo.homeOwner ho
where ho.homeid = @homeId
go

