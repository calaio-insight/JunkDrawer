create table trustedNeighbor
(
    trustedNeighborId int identity
        primary key,
    userId            int                         not null
        constraint homeOwner_user__fk
            references [user],
    homeId            int                         not null
        constraint homeOwner_home__fk
            references home,
    createdBy         int                         not null
        constraint trustedNeighbor_user_userId_fk_2
            references [user],
    createdDate       datetime2 default getdate() not null,
    modifiedBy        int                         not null
        constraint trustedNeighbor_user_userId_fk
            references [user],
    modifiedDate      datetime2 default getdate() not null
)
go

