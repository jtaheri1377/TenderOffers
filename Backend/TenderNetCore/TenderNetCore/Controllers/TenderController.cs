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
    public class TenderController : ControllerBase
    {
        private readonly ITenderService _tenderService;

        public TenderController(ITenderService tenderService)
        {
            _tenderService = tenderService;
        }

        // GET: api/<TenderController>
        [HttpGet("GetAll")]
        public async Task<IList<Tender>> GetAll()
        {
            return await _tenderService.GetAllTenders();
        }

        // GET api/<TenderController>/5
        [HttpGet("{id}")]
        public async Task<Tender> Get(int id)
        {
            return await _tenderService.GetById(id);
        }

        // POST api/<TenderController>
        [HttpPost]
        public void AddTender([FromBody] Tender tender)
        {
            _tenderService.AddTender(tender);
        }

        // PUT api/<TenderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Tender tender)
        {
            _tenderService.Update(id, tender);
        }

        // DELETE api/<TenderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _tenderService.Delete(id);
        }
    }
}
