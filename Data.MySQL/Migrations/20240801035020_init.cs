using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.MySQL.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailUpperCase = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PrivateKey = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Invitation = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedDateTime = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedDateTime", "Email", "EmailUpperCase", "Invitation", "LastModifiedDateTime", "Name", "PhoneNumber", "PrivateKey", "Status" },
                values: new object[] { new Guid("548312b6-a7ec-496b-ab7c-cc4c16060882"), new DateTimeOffset(new DateTime(2024, 8, 1, 11, 50, 20, 696, DateTimeKind.Unspecified).AddTicks(2592), new TimeSpan(0, 8, 0, 0, 0)), "birenchens@163.com", "BIRENCHENS@163.COM", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 8, 1, 11, 50, 20, 696, DateTimeKind.Unspecified).AddTicks(2620), new TimeSpan(0, 8, 0, 0, 0)), "Dvorak", "WabGCtqzQ28RPTyhXNHEgw==", "eyIfyiYBz/ABY5QBSbSFOv/V2p8XR7URQ2h4smfgRXk=", 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
