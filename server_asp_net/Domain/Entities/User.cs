namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string City { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsCarOwner { get; set; }
        public bool SSOGoogleId { get; set; }
        public int LikesNumber { get; set; }
        public required string Avatar { get; set; }
        public required string Password { get; set; }
    }
}
