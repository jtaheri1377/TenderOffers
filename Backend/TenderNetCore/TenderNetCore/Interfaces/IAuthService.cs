using TenderNetCore.Entities;

namespace TenderNetCore.Interfaces
{
    public interface IAuthService
    {
        public string Login(string username, string password);
        public void Signup(User user);
        public User GetUserByUsername(string username);
    }
}
