using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class book_authorAddkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_book_author_author_AuthorId",
                table: "book_author");

            migrationBuilder.DropForeignKey(
                name: "FK_book_author_book_BookId",
                table: "book_author");

            migrationBuilder.DropIndex(
                name: "IX_book_author_AuthorId",
                table: "book_author");

            migrationBuilder.DropIndex(
                name: "IX_book_author_BookId",
                table: "book_author");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "book_author");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "book_author");

            migrationBuilder.CreateIndex(
                name: "IX_book_author_Book_Id",
                table: "book_author",
                column: "Book_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_book_author_author_Author_Id",
                table: "book_author",
                column: "Author_Id",
                principalTable: "author",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_book_author_book_Book_Id",
                table: "book_author",
                column: "Book_Id",
                principalTable: "book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_book_author_author_Author_Id",
                table: "book_author");

            migrationBuilder.DropForeignKey(
                name: "FK_book_author_book_Book_Id",
                table: "book_author");

            migrationBuilder.DropIndex(
                name: "IX_book_author_Book_Id",
                table: "book_author");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "book_author",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BookId",
                table: "book_author",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_book_author_AuthorId",
                table: "book_author",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_book_author_BookId",
                table: "book_author",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_book_author_author_AuthorId",
                table: "book_author",
                column: "AuthorId",
                principalTable: "author",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_book_author_book_BookId",
                table: "book_author",
                column: "BookId",
                principalTable: "book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
