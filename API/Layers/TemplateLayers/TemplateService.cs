using API.Utils.Templates;
using ClosedXML.Excel;

namespace API.Layers.TemplateLayers
{
    public class TemplateService
    {
        public MemoryStream BookArrayInsertTemplate()
        {
            var workbook = BookTemplates.GetBookInsertTemplate();

            var stream = new MemoryStream();

            workbook.SaveAs(stream);
            workbook.Dispose();

            stream.Position = 0;

            return stream;
        }


    }
}
