CREATE procedure GetHomeOwnerByUserId
    @userId nvarchar(250)
as
select
       ho.homeownerid
     , ho.userid
     , ho.homeid
     , ho.displayName
from dbo.homeOwner ho
where ho.userid = @userid
go

