create table homePermission
(
    homePermissionId   int identity
        constraint homePermission_pk
            primary key,
    homePermissionName nvarchar(250)               not null
        constraint homePermission_pk_2
            unique,
    createdBy          int                         not null
        constraint homePermission_user_userId_fk
            references [user],
    createdDate        datetime2 default getdate() not null,
    modifiedBy         int                         not null
        constraint homePermission_user_userId_fk_2
            references [user],
    modifiedDate       datetime2 default getdate() not null
)
go

