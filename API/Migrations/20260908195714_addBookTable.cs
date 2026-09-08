using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addBookTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "url",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Book_Id",
                table: "url",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "book",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Summary = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Rating = table.Column<double>(type: "double precision", precision: 3, scale: 1, nullable: true),
                    TotalChapters = table.Column<int>(type: "integer", nullable: true),
                    CurrentChapter = table.Column<int>(type: "integer", nullable: true),
                    Words = table.Column<int>(type: "integer", nullable: true),
                    ReadingStatus = table.Column<int>(type: "integer", nullable: false),
                    WritingStatus = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_book", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_url_BookId",
                table: "url",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_url_book_BookId",
                table: "url",
                column: "BookId",
                principalTable: "book",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_url_book_BookId",
                table: "url");

            migrationBuilder.DropTable(
                name: "book");

            migrationBuilder.DropIndex(
                name: "IX_url_BookId",
                table: "url");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "url");

            migrationBuilder.DropColumn(
                name: "Book_Id",
                table: "url");
        }
    }
}
