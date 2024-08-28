CREATE procedure GetUserByEmail
    @userEmail nvarchar(250)
as
select
       u.userId
     , u.email
     , u.firstName
     , u.lastName
     , u.displayName
     , u.photoUrl
     , u.createdDate
from dbo.[user] u
where u.email = @userEmail
go

