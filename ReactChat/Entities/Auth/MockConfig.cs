namespace ReactChat.Entities.Auth;

public class MockConfig
{
    public bool MockUserEnabled { get; set; }
    public List<MockUserDetails> MockUser { get; set; } = new List<MockUserDetails>();
}

public class MockUserDetails
{
    public string id_token { get; set; } = string.Empty;
    public string provider_name { get; set; } = string.Empty;
    public string user_id { get; set; } = string.Empty;
    public List<MockUserClaim> user_claims { get; set; } = new List<MockUserClaim>();
}

public class MockUserClaim
{
    public string typ { get; set; } = string.Empty;
    public string val { get; set; } = string.Empty;
}