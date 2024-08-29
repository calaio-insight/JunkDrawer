CREATE procedure GetHomesByUserId
    @userId int
as
select
       h.homeId
     , h.homeName
     , h.homePhoto
     , h.address
     , h.address2
     , h.city
     , h.state
     , h.zip
     , h.purchaseDate
     , h.purchasePrice
     , h.createdBy
     , h.createdDate
     , h.modifiedBy
     , h.modifiedDate
     , h.notes
from dbo.home h
left join dbo.trustedNeighbor t on h.homeId = t.homeId
where t.userId = @userId or h.createdBy = @userId
go

