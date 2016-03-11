using System;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;

namespace TheWorld.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable("Trip", table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                Created = table.Column<DateTime>(nullable: false),
                Name = table.Column<string>(nullable: true),
                UserName = table.Column<string>(nullable: true)
            },
                constraints: table => { table.PrimaryKey("PK_Trip", x => x.Id); });
            migrationBuilder.CreateTable("Stop", table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                Arrival = table.Column<DateTime>(nullable: false),
                Latitude = table.Column<double>(nullable: false),
                Longitude = table.Column<double>(nullable: false),
                Name = table.Column<string>(nullable: true),
                Order = table.Column<int>(nullable: false),
                TripId = table.Column<int>(nullable: true)
            },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stop", x => x.Id);
                    table.ForeignKey("FK_Stop_Trip_TripId", x => x.TripId, "Trip", "Id",
                        onDelete: ReferentialAction.Restrict);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Stop");
            migrationBuilder.DropTable("Trip");
        }
    }
}