const ExcelJS = require("exceljs");

class excel {

    constructor(filePath,textSearch,replaceText,output)
    {
        this.filePath = filePath;
        this.textSearch = textSearch;
        this.replaceText = replaceText;
        this.output = output;

    }
async writeExcel(){

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
   // const output = readExcel(worksheet, this.textSearch); // not async
   const colIndex = this.output.column + (this.output.colChange || 0);

// guard against invalid column values
if (colIndex < 1 || colIndex > 16384) {
  throw new Error(`Invalid column index: ${colIndex}`);
}

const cell = worksheet.getCell(this.output.row, colIndex);
cell.value = this.replaceText;
await workbook.xlsx.writeFile(this.filePath);

}

}
module.exports = {excel};
