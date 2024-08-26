create procedure GetHomesByUserId
    @userId nvarchar(250)
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
join dbo.homeOwner ho on h.homeId = ho.homeId
where ho.userId = @userId
go

