using ClosedXML.Excel;

namespace API.Utils.FileManipulation
{
    public static class XlsxFunctions
    {
        public static List<List<string>> IFileToArray(IFormFile file)
        {
            var fileStream = file.OpenReadStream();

            var workbook = new XLWorkbook(fileStream);
            
            var headerLenght = workbook.Worksheet(1).Row(1).CellsUsed().Count();
            var workSheet = workbook.Worksheet(1).RowsUsed().Skip(1);

            var rowsArray = new List<List<string>>();
            foreach (var row in workSheet)
            {
                var cellsArray = new List<string>();

                for(int i = 1; i <= headerLenght; i++)
                {
                    cellsArray.Add(row.Cell(i).GetValue<string>());
                }
            
                rowsArray.Add(cellsArray);

            }
            return rowsArray;
        }
    }
}
