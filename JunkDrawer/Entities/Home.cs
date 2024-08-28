namespace JunkDrawer.Entities;

public class Home
{
    public Home()
    {
        TrustedNeighbors = [];
    }
    
    public int HomeId { get; set; }
    public string HomeName { get; set; }
    public string? HomePhoto { get; set; }
    public string? Address { get; set; }
    public string? Address2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public double? PurchasePrice { get; set; }
    public string? Notes { get; set; }
    public int? CreatedBy { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public List<TrustedNeighbor> TrustedNeighbors { get; set; }
}