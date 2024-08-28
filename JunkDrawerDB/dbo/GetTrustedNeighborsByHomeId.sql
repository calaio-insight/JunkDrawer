CREATE procedure GetTrustedNeighborsByHomeId
@homeId int
as
select
       t.trustedNeighborId
     , t.userid
     , t.homeid
from dbo.trustedNeighbor t
where t.homeid = @homeId
go

