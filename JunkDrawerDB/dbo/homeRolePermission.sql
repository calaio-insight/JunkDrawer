create table homeRolePermission
(
    homeRolePermissionId int identity
        constraint homeRolePermission_pk
            primary key,
    homeRoleId           int                         not null
        constraint homeRolePermission_homeRole_homeRoleId_fk
            references homeRole,
    homePermissionId     int                         not null
        constraint homeRolePermission_homePermission_homePermissionId_fk
            references homePermission,
    createdBy            int                         not null
        constraint homeRolePermission_user_userId_fk
            references [user],
    createdDate          datetime2 default getdate() not null,
    modifiedBy           int                         not null
        constraint homeRolePermission_user_userId_fk_2
            references [user],
    modifiedDate         datetime2 default getdate() not null
)
go

