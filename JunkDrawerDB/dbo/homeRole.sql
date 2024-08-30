create table homeRole
(
    homeRoleId   int identity
        constraint homeRole_pk
            primary key,
    homeRoleName nvarchar(250)               not null
        constraint homeRole_pk_2
            unique,
    createdBy    int                         not null
        constraint homeRole_user_userId_fk
            references [user],
    createdDate  datetime2 default getdate() not null,
    modifiedBy   int                         not null
        constraint homeRole_user_userId_fk_2
            references [user],
    modifiedDate datetime2 default getdate() not null
)
go

