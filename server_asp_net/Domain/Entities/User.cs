namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? City { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsCarOwner { get; set; }
        public bool SSOGoogleId { get; set; }
        public int LikesNumber { get; set; }
        public string? Avatar { get; set; }
        public string? Password { get; set; }
    }
}
