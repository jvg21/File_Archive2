using ClosedXML.Excel;

namespace API.Utils.Templates
{
    public abstract class BookTemplates
    {

        public static XLWorkbook GetBookInsertTemplate()
        {
            var workbook = new XLWorkbook();

            var worksheet = workbook.AddWorksheet("book");

            worksheet.Cell("A1").Value = "Title";
            worksheet.Cell("B1").Value = "Summary";
            worksheet.Cell("C1").Value = "Notes";
            worksheet.Cell("D1").Value = "Rating";
            worksheet.Cell("E1").Value = "CurrentChapter";
            worksheet.Cell("F1").Value = "TotalChapter";
            worksheet.Cell("G1").Value = "Words";
            worksheet.Cell("H1").Value = "ReadingStatus";
            worksheet.Cell("I1").Value = "WritingStatus";
            worksheet.Cell("J1").Value = "Url";
            worksheet.Cell("K1").Value = "Url2";
            worksheet.Cell("L1").Value = "Url3";

            worksheet.Columns().AdjustToContents();

            return workbook;
        }


    }
}
