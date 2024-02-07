using Microsoft.EntityFrameworkCore;
using TenderNetCore.AppContexts;
using TenderNetCore.Entities;
using TenderNetCore.Interfaces;

namespace TenderNetCore.Services
{
    public class TenderService : ITenderService
    {
        private readonly MainContext cntxt = new MainContext();

        public async Task<IList<Tender>> GetAllTenders()
        {
            //if (cntxt.Tenders.Any())
            return await cntxt.Tenders.ToListAsync();
            //else return null;

        }

        public async Task<Tender> GetById(int id)
        {
            return await cntxt.Tenders.FirstOrDefaultAsync(x => x.id == id);
        }

        public void AddTender(Tender tender)
        {
            cntxt.Tenders.Add(tender);
            cntxt.SaveChanges();
        }

        public void Update(int id, Tender tender)
        {
            if (cntxt.Tenders.Any(x => x.id == id))
            {
                tender.id = id;
                cntxt.Tenders.Update(tender);
                cntxt.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            if (cntxt.Tenders.Any(x => x.id == id))
            {
                var item = this.cntxt.Tenders.FirstOrDefault(x => x.id == id);
                cntxt.Tenders.Remove(item);
                cntxt.SaveChanges();
            }
        }
    }
}
