namespace DTOs
{
    public class LoginDto
    {
        private string _username;

        public string Username
        {
            get
            {
                return _username;
            }
            set
            {
                _username = value.Trim();
            }
        }
        public string Password { get; set; }

    }
}