namespace JunkDrawer.Entities;

public class TrustedNeighbor
{
    public int TrustedNeighborId { get; set; }
    public int HomeId { get; set; }
    public int UserId { get; set; }
    public string Role { get; set; }

    //View properties
    public string DisplayName { get; set; }
}