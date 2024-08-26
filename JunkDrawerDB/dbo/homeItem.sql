create table homeItem
(
    homeItemId      int identity
        primary key,
    homeId          int not null
        constraint homeItem_home__fk
            references home,
    itemName        nvarchar(250),
    itemPhoto       nvarchar(max),
    purchaseDate    datetime2,
    purchasePrice   decimal,
    maintenanceDate datetime2,
    maintenanceCost decimal,
    notes           nvarchar(max),
    createdBy       nvarchar(max),
    createdDate     datetime2,
    modifiedBy      nvarchar(max),
    modifiedDate    datetime2
)
go

