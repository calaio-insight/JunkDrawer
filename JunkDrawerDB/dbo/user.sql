create table [user]
(
    userId      int identity
        constraint user_pk
            primary key,
    email       nvarchar(250)               not null,
    firstName   nvarchar(100)               not null,
    lastName    nvarchar(100)               not null,
    displayName nvarchar(100)               not null,
    createdDate datetime2 default getdate() not null,
    photoUrl    nvarchar(250)
)
go

