﻿// <auto-generated />
using System;
using Data.MySQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.MySQL.Migrations
{
    [DbContext(typeof(MySQLKaosiDbContext))]
    partial class MySQLKaosiDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Data.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("CreatedDateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EmailUpperCase")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("Invitation")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("LastModifiedDateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("varchar(32)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("varchar(32)");

                    b.Property<string>("PrivateKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("548312b6-a7ec-496b-ab7c-cc4c16060882"),
                            CreatedDateTime = new DateTimeOffset(new DateTime(2024, 8, 1, 11, 50, 20, 696, DateTimeKind.Unspecified).AddTicks(2592), new TimeSpan(0, 8, 0, 0, 0)),
                            Email = "birenchens@163.com",
                            EmailUpperCase = "BIRENCHENS@163.COM",
                            Invitation = new Guid("00000000-0000-0000-0000-000000000000"),
                            LastModifiedDateTime = new DateTimeOffset(new DateTime(2024, 8, 1, 11, 50, 20, 696, DateTimeKind.Unspecified).AddTicks(2620), new TimeSpan(0, 8, 0, 0, 0)),
                            Name = "Dvorak",
                            PhoneNumber = "WabGCtqzQ28RPTyhXNHEgw==",
                            PrivateKey = "eyIfyiYBz/ABY5QBSbSFOv/V2p8XR7URQ2h4smfgRXk=",
                            Status = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}