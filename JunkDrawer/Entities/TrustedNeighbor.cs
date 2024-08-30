using JunkDrawer.Enums;

namespace JunkDrawer.Entities;

public class TrustedNeighbor
{
    public int TrustedNeighborId { get; set; }
    public int HomeId { get; set; }
    public int UserId { get; set; }
    public HomeRoleType RoleType { get; set; }

    //View properties
    public string DisplayName { get; set; }
}