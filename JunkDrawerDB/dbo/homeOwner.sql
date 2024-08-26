create table homeOwner
(
    homeOwnerId int identity
        primary key,
    userId      nvarchar(250) not null,
    homeId      int           not null
        constraint homeOwner_home__fk
            references home,
    displayName nvarchar(max) not null
)
go

