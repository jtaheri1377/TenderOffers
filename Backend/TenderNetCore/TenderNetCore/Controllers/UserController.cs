using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TenderNetCore.Entities;
using TenderNetCore.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TenderNetCore.Controllers
{
    //[EnableCors("AllowAnyOrigin")]
   
    [Route("/[controller]")]
    [ApiController]
    [Authorize]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        

        [HttpGet("GetContractors")]
        public async Task<IList<User>> GetAll()
        {
            return await userService.GetContractors();
        }
    }
}
