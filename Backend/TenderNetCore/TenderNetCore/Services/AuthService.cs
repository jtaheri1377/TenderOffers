using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TenderNetCore.AppContexts;
using TenderNetCore.Config;
using TenderNetCore.Entities;
using TenderNetCore.Interfaces;

namespace TenderNetCore.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;
        private readonly MainContext _cntxt = new MainContext();

        public AuthService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        private string _issuer = "your_issuer_here";



        public string Login(string username, string password)
        {

            if (!_cntxt.Users.Any(x => x.username == username && x.password == password))
                return null;

            var _username = _cntxt.Users
                .FirstOrDefault(x =>
                x.username == username &&
                x.password == password
                ).username;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);



            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier,_username)
        };

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _issuer,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return "Bearer " + tokenHandler.WriteToken(token);
        }

        public User GetUserByUsername(string username)
        {
            //if (!_cntxt.Users.Any(x => x.username == username))
            //    return null;
            return _cntxt.Users.FirstOrDefault(x => x.username == username);
        }

        public async void Signup(User user)
        {
            await _cntxt.AddAsync(user);
            _cntxt.SaveChanges();
        }
    }
}
