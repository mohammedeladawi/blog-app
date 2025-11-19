namespace DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Summary { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDto Author { get; set; }

    }
}