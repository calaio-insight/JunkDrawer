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
    createdBy     int           not null
        constraint home_user__fk
            references [user],
    createdDate   datetime2     not null,
    modifiedBy    int           not null
        constraint home_user__fk_2
            references [user],
    modifiedDate  datetime2     not null,
    notes         nvarchar(max),
    homeName      nvarchar(250) not null,
    address2      nvarchar(250)
)
go

