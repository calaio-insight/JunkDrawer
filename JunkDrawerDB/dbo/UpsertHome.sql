create procedure UpsertHome
      @homeId int = null
    , @homePhoto nvarchar(max) = null
    , @address nvarchar(250) = null
    , @city nvarchar(250) = null
    , @state nvarchar(2) = null
    , @zip nvarchar(50) = null
    , @purchaseDate datetime2 = null
    , @purchasePrice decimal = null
    , @notes nvarchar(max) = null
    , @createdBy nvarchar(max) = null
    , @createdDate datetime2 = null
    , @modifiedBy nvarchar(max) = null
    , @modifiedDate datetime2 = null
as
begin
    begin transaction;

    update dbo.home
    set
          homePhoto = isnull(@homePhoto, homePhoto)
        , address = isnull(@address, address)
        , city = isnull(@city, city)
        , state = isnull(@state, state)
        , zip = isnull(@zip, zip)
        , purchaseDate = isnull(@purchaseDate, purchaseDate)
        , purchasePrice = isnull(@purchasePrice, purchasePrice)
        , notes = isnull(@notes, notes)
        , createdBy = isnull(@createdBy, createdBy)
        , createdDate = isnull(@createdDate, createdDate)
        , modifiedBy = isnull(@modifiedBy, modifiedBy)
        , modifiedDate = isnull(@modifiedDate, modifiedDate)
    where homeId = @homeId

    if @@rowcount = 0
        insert into dbo.home (homePhoto, address, city, state, zip, purchaseDate, purchasePrice, notes, createdBy, createdDate, modifiedBy, modifiedDate)
        values (@homePhoto, @address, @city, @state, @zip, @purchaseDate, @purchasePrice, @notes, @createdBy, @createdDate, @modifiedBy, @modifiedDate)

    commit transaction;
end
go

