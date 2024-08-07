using Data.MySQL;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Tests;

public class TestWithDatabase
{
    protected SqliteConnection conn;
    protected DbContextOptions<MySQLKaosiDbContext> connOptions;

    public TestWithDatabase()
    {
        conn = new SqliteConnection("Filename=:memory:");
        conn.Open();
        connOptions = new DbContextOptionsBuilder<MySQLKaosiDbContext>()
          .UseSqlite(conn)
          .Options;
    }

    protected MySQLKaosiDbContext CreateContext() => new(connOptions);

}
