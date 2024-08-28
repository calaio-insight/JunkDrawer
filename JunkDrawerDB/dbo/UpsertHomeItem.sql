CREATE procedure UpsertHomeItem
      @homeItemId int = null
    , @homeId int = null
    , @itemName nvarchar(250) = null
    , @itemPhoto nvarchar(max) = null
    , @purchaseDate datetime2 = null
    , @purchasePrice decimal = null
    , @maintenanceDate datetime2 = null
    , @maintenanceCost decimal = null
    , @notes nvarchar(max) = null
    , @createdBy int = null
    , @createdDate datetime2 = null
    , @modifiedBy int = null
    , @modifiedDate datetime2 = null
as
begin
    begin transaction;

    update dbo.homeItem
    set
          homeId = isnull(@homeId, homeId)
        , itemName = isnull(@itemName, itemName)
        , itemPhoto = isnull(@itemPhoto, itemPhoto)
        , purchaseDate = isnull(@purchaseDate, purchaseDate)
        , purchasePrice = isnull(@purchasePrice, purchasePrice)
        , maintenanceDate = isnull(@maintenanceDate, maintenanceDate)
        , maintenanceCost = isnull(@maintenanceCost, maintenanceCost)
        , notes = isnull(@notes, notes)
        , createdBy = isnull(@createdBy, createdBy)
        , createdDate = isnull(@createdDate, createdDate)
        , modifiedBy = isnull(@modifiedBy, modifiedBy)
        , modifiedDate = isnull(@modifiedDate, modifiedDate)
    where homeItemId = @homeItemId

    if @@rowcount = 0
        insert into dbo.homeItem (homeId, itemName, itemPhoto, purchaseDate, purchasePrice, maintenanceDate, maintenanceCost, notes, createdBy, createdDate, modifiedBy, modifiedDate)
        values (@homeId, @itemName, @itemPhoto, @purchaseDate, @purchasePrice, @maintenanceDate, @maintenanceCost, @notes, @createdBy, @createdDate, @modifiedBy, @modifiedDate)

    commit transaction;
end
go

