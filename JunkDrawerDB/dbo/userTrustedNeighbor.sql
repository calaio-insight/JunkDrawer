create table userTrustedNeighbor
(
    userTrustedNeighborId int identity,
    userId                int not null
        constraint userTrustedNeighbor_user_userId_fk
            references [user],
    trustedUserId         int not null
        constraint userTrustedNeighbor_user_userId_fk_2
            references [user],
    constraint userTrustedNeighbor_trustedNeighbor_trustedNeighborId_fk
        foreign key (trustedNeighborId) references trustedNeighbor
)
go

