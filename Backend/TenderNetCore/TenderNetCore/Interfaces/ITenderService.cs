using TenderNetCore.Entities;

namespace TenderNetCore.Interfaces
{
    public interface ITenderService
    {
        public Task<IList<Tender>> GetAllTenders();
        public Task<Tender> GetById(int id);
        public void AddTender(Tender tender);
        public void Update(int id, Tender tender);
        public void Delete(int id);

    }
}
