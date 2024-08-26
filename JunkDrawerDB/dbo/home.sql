create table home
(
    homeId        int identity
        constraint home_pk
            primary key,
    homePhoto     nvarchar(max),
    address       nvarchar(250),
    city          nvarchar(250),
    state         nvarchar(2),
    zip           nvarchar(50),
    purchaseDate  datetime2,
    purchasePrice decimal,
    createdBy     nvarchar(max),
    createdDate   datetime2,
    modifiedBy    nvarchar(max),
    modifiedDate  datetime2,
    notes         nvarchar(max)
)
go

