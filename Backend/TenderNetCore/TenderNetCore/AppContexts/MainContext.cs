using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TenderNetCore.Entities;

namespace TenderNetCore.AppContexts
{
    public class MainContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer("server=.;database=TenderDB;trusted_connection=true;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tender>()
                .Property(p => p.chosenContractor)
                .IsRequired()
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<ChosenContractor>(v)
                );

            modelBuilder.Entity<Tender>()
                .Property(p => p.contributors)
                .IsRequired()
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<Contributor[]>(v)
                );
        }

        public DbSet<Tender> Tenders { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
