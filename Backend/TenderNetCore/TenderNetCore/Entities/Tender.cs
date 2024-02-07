using System.ComponentModel.DataAnnotations;

namespace TenderNetCore.Entities
{
    public class Tender
    {
        public int id { get; set; }
        public string title{ get; set; }
        public string comment { get; set; }
        public string startOn { get; set; }
        public string finishOn { get; set; }
        public int minPrice { get; set; }
        public int maxPrice { get; set; }
        public bool isActive { get; set; }
        public ChosenContractor chosenContractor { get; set; }
        public Contributor[] contributors { get; set; }

    }
}
