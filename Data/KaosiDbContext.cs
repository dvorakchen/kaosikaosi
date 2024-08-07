using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class KaosiDbContext : DbContext
    {
        public KaosiDbContext()
        {

        }

        public KaosiDbContext(DbContextOptions options) : base(options)
        {

        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
    }

    public static class KaosiDbContextExtension
    {
        public static async Task ClearAllDataAsync(this KaosiDbContext context)
        {
            context.Users.RemoveRange();

            await context.SaveChangesAsync();
        }
    }

}
