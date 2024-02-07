using System.ComponentModel.DataAnnotations;

namespace TenderNetCore.Entities
{
    public class User
    {
        public int id { get; set; }
        public string fullname{ get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int type { get; set; }
        public string? comment { get; set; }

    }
}
