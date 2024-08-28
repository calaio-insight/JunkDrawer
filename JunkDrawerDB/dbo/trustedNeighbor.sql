create table trustedNeighbor
(
    trustedNeighborId int identity
        primary key,
    userId            int not null
        constraint homeOwner_user__fk
            references [user],
    homeId            int not null
        constraint homeOwner_home__fk
            references home
)
go

