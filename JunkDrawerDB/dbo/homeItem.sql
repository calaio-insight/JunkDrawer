create table homeItem
(
    homeItemId      int identity
        primary key,
    homeId          int                         not null
        constraint homeItem_home__fk
            references home,
    itemName        nvarchar(250),
    itemPhoto       nvarchar(max),
    purchaseDate    datetime2,
    purchasePrice   decimal,
    maintenanceDate datetime2,
    maintenanceCost decimal,
    notes           nvarchar(max),
    createdBy       int                         not null
        constraint homeItem_user_userId_fk
            references [user],
    createdDate     datetime2 default getdate() not null,
    modifiedBy      int                         not null
        constraint homeItem_user__fk
            references [user],
    modifiedDate    datetime2 default getdate() not null
)
go

