create procedure GetAllHomes
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
go

