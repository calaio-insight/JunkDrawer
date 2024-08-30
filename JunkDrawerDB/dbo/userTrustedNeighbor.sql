create table userTrustedNeighbor
(
    userTrustedNeighborId int identity,
    userId                int                         not null
        constraint userTrustedNeighbor_user_userId_fk
            references [user],
    trustedUserId         int                         not null
        constraint userTrustedNeighbor_user_userId_fk_2
            references [user],
    createdBy             int                         not null
        constraint userTrustedNeighbor_user_userId_fk_3
            references [user],
    createdDate           datetime2 default getdate() not null,
    modifiedBy            int                         not null
        constraint userTrustedNeighbor_user_userId_fk_4
            references [user],
    modifiedDate          datetime2 default getdate() not null
)
go

