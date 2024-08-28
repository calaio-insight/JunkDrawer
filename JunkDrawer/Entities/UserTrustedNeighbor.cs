namespace JunkDrawer.Entities;

public class UserTrustedNeighbor
{
    public int UserTrustedNeighborId { get; set; }
    public int UserId { get; set; }
    public int TrustedUserId { get; set; }
    
    //Joined props
    public string DisplayName { get; set; }
    public string PhotoUrl { get; set; }
    public string Email { get; set; }
}