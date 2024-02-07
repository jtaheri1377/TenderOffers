using System.ComponentModel.DataAnnotations;

namespace TenderNetCore.Entities
{
    public class UserDto
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
