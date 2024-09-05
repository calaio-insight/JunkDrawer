CREATE procedure UpdateHomeItemImage
@homeItemId int
, @modifiedBy int
, @modifiedDate datetime2
, @itemPhoto nvarchar(max)
as
begin
    begin transaction;

    update dbo.homeItem
    set
        itemPhoto = isnull(@itemPhoto, itemPhoto)
      , modifiedBy = isnull(@modifiedBy, modifiedBy)
      , modifiedDate = isnull(@modifiedDate, modifiedDate)
    where homeItemId = @homeItemId

    commit transaction;
end
go

