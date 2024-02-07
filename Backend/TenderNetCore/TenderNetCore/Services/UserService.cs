using Microsoft.EntityFrameworkCore;
using TenderNetCore.AppContexts;
using TenderNetCore.Entities;
using TenderNetCore.Interfaces;

namespace TenderNetCore.Services
{
    public class UserService : IUserService
    {
        MainContext _cntxt = new MainContext();
        public async Task<IList<User>> GetContractors()
        {
            List<User> contractors = await this._cntxt.Users
                   .Where(x => x.type == 1).ToListAsync();
            return contractors;
        }
    }
}
