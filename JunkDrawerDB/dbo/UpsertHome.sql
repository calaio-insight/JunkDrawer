CREATE procedure UpsertHome
      @homeId int = null
    , @homeName nvarchar(250) = null
    , @homePhoto nvarchar(max) = null
    , @address nvarchar(250) = null
    , @address2 nvarchar(250) = null
    , @city nvarchar(250) = null
    , @state nvarchar(2) = null
    , @zip nvarchar(50) = null
    , @purchaseDate datetime2 = null
    , @purchasePrice decimal = null
    , @notes nvarchar(max) = null
    , @createdBy int = null
    , @createdDate datetime2 = null
    , @modifiedBy int = null
    , @modifiedDate datetime2 = null
as
begin
    begin transaction;

    update dbo.home
    set
          homeName = isnull(@homeName, homeName)
        , homePhoto = isnull(@homePhoto, homePhoto)
        , address = isnull(@address, address)
        , address2 = isnull(@address2, address2)
        , city = isnull(@city, city)
        , state = isnull(@state, state)
        , zip = isnull(@zip, zip)
        , purchaseDate = isnull(@purchaseDate, purchaseDate)
        , purchasePrice = isnull(@purchasePrice, purchasePrice)
        , notes = isnull(@notes, notes)
        , modifiedBy = isnull(@modifiedBy, modifiedBy)
        , modifiedDate = isnull(@modifiedDate, modifiedDate)
    where homeId = @homeId    

    if @@rowcount = 0
        begin
            insert into dbo.home (homeName, homePhoto, address, address2, city, state, zip, purchaseDate, purchasePrice, notes, createdBy, createdDate, modifiedBy, modifiedDate)
            values (@homeName, @homePhoto, @address, @address2, @city, @state, @zip, @purchaseDate, @purchasePrice, @notes, @createdBy, @createdDate, @modifiedBy, @modifiedDate)
            select SCOPE_IDENTITY();
        end
    else
        select @homeId;

    
    commit transaction;
end
go

