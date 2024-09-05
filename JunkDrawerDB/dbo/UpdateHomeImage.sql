CREATE procedure UpdateHomeImage
      @homeId int
    , @modifiedBy int
    , @modifiedDate datetime2
    , @homePhoto nvarchar(max)
as
begin
    begin transaction;

    update dbo.home
    set
        homePhoto = isnull(@homePhoto, homePhoto)
      , modifiedBy = isnull(@modifiedBy, modifiedBy)
      , modifiedDate = isnull(@modifiedDate, modifiedDate)
    where homeId = @homeId

    commit transaction;
end
go

