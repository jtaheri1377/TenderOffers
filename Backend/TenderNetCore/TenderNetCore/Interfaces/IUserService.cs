using TenderNetCore.Entities;

namespace TenderNetCore.Interfaces
{
    public interface IUserService
    {
        public Task<IList<User>> GetContractors();
    }
}
