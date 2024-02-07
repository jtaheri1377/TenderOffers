using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TenderNetCore.Migrations
{
    /// <inheritdoc />
    public partial class TenderDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChosenContractor",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChosenContractor", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Tenders",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    startOn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    finishOn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    minPrice = table.Column<int>(type: "int", nullable: false),
                    maxPrice = table.Column<int>(type: "int", nullable: false),
                    isActive = table.Column<int>(type: "int", nullable: false),
                    chosenContractorid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenders", x => x.id);
                    table.ForeignKey(
                        name: "FK_Tenders_ChosenContractor_chosenContractorid",
                        column: x => x.chosenContractorid,
                        principalTable: "ChosenContractor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contributor",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    suggestedPrice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tenderid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contributor", x => x.id);
                    table.ForeignKey(
                        name: "FK_Contributor_Tenders_Tenderid",
                        column: x => x.Tenderid,
                        principalTable: "Tenders",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contributor_Tenderid",
                table: "Contributor",
                column: "Tenderid");

            migrationBuilder.CreateIndex(
                name: "IX_Tenders_chosenContractorid",
                table: "Tenders",
                column: "chosenContractorid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contributor");

            migrationBuilder.DropTable(
                name: "Tenders");

            migrationBuilder.DropTable(
                name: "ChosenContractor");
        }
    }
}
