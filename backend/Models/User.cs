namespace Models
{
    public class User
    {
        public int Id { get; set; }
        private string _username;
        private string _email;

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
        public string Email
        {
            get
            {
                return _email;
            }
            set
            {
                _email = value.Trim();
            }
        }

        public string PasswordHash { get; set; }
    }
}