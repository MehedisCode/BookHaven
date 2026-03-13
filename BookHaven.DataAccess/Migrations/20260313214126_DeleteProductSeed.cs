using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookHaven.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class DeleteProductSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Author", "Description", "ISBN", "ListPrice", "Price", "Price100", "Price50", "Title" },
                values: new object[] { 1, "Mehedi", "Description 1", "Isbn", 100.0, 100.0, 60.0, 80.0, "Book1" });
        }
    }
}
