using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class correctAuthorUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_url_book_BookId",
                table: "url");

            migrationBuilder.DropIndex(
                name: "IX_url_BookId",
                table: "url");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "url");

            migrationBuilder.CreateIndex(
                name: "IX_url_Book_Id",
                table: "url",
                column: "Book_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_url_book_Book_Id",
                table: "url",
                column: "Book_Id",
                principalTable: "book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_url_book_Book_Id",
                table: "url");

            migrationBuilder.DropIndex(
                name: "IX_url_Book_Id",
                table: "url");

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "url",
                type: "integer",
                nullable: true);

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
    }
}
