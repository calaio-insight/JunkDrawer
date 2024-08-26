create table homeOwner
(
    homeOwnerId int identity
        primary key,
    userId      int not null,
    homeId      int not null
        constraint homeOwner_home__fk
            references home
)
go

