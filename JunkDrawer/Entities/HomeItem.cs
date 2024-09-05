namespace JunkDrawer.Entities;

public class HomeItem
{
    public int HomeItemId { get; set; }
    public int HomeId { get; set; }
    public string ItemName { get; set; }
    public string? ItemPhoto { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchasePrice { get; set; }
    public DateTime? MaintenanceDate { get; set; }
    public decimal? MaintenanceCost { get; set; }
    public string Notes { get; set; }
    public int CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public int ModifiedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
}