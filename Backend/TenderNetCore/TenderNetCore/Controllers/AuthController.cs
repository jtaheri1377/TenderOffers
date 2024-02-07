using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using TenderNetCore.Entities;
using TenderNetCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TenderNetCore.Controllers
{
   
    [Route("/[controller]")]
    [ApiController]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }
 
        // GET: api/<TenderController>
        [HttpPost("Login")]
        public async Task<String> Login([FromBody] UserDto user)
        {
            return _authService.Login(user.username,user.password);
        }

        [HttpPost("Signup")]
        public async void Signup([FromBody] User user)
        {
             _authService.Signup(user);
        }

        [HttpGet("GetCurrent")]
        public async Task<User> GetCurrentUser()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return  _authService.GetUserByUsername(username);
        }


    }
}
