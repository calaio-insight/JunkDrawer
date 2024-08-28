CREATE procedure InsertUser
@email nvarchar(250)
, @firstName nvarchar(100)
, @lastName nvarchar(100)
, @displayName nvarchar(100)
, @photoUrl nvarchar(250)
as
begin
    begin transaction;

    insert into dbo.[user] (email, firstName, lastName, displayName, photoUrl)
    values (@email, @firstName, @lastName, @displayName, @photoUrl)

    select SCOPE_IDENTITY();

    commit transaction;
end
go

