CREATE procedure GetUserById
    @userId int
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
where u.userId = @userId
go

