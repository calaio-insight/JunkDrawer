create procedure GetHomeById
    @homeId int
as
select
       h.homeId
     , h.homePhoto
     , h.address
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
where h.homeId = @homeId
go

