using Microsoft.EntityFrameworkCore;

namespace Data.MySQL
{
    public class MySQLKaosiDbContext : KaosiDbContext
    {

        public MySQLKaosiDbContext()
        {

        }

        public MySQLKaosiDbContext(DbContextOptions options) : base(options)
        {

        }

    }
}
