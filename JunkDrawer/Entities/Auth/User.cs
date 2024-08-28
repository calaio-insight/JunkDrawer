namespace JunkDrawer.Entities.Auth;

public class User
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DisplayName { get; set; }
    public string PhotoUrl { get; set; }
    public DateTime CreatedDate { get; set; }
}