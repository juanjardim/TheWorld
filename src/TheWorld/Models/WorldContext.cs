using Microsoft.Data.Entity;

namespace TheWorld.Models
{
    public class WorldContext : DbContext
    {
        public WorldContext()
        {
            Database.EnsureCreated();
        }
        public DbSet<Trip> Trips { get; set; }

        public DbSet<Stop> Stops { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            var connectionString = Startup.Configuration["Data:WorldContextConnection"];

            optionBuilder.UseSqlServer(connectionString);

            base.OnConfiguring(optionBuilder);
        }
    }
}
