// //what this module should do is:
// //1.get a list of all registration applications that the students submitted earlier
// //2.write it to an excel sheet
// //3.this excel sheet should be sent to Helwan university to be checked whether the data is correct or not
// // ... (your existing imports)
const errorHandling = require("../../utils/errorHandling");
const Egyptions = require("../../../DB/model/User.model.js");
const Expartriates = require("../../../DB/model/User.model.js");
const ExcelJS = require("exceljs");
const fs = require("fs").promises;
// // ... (your existing imports)
// ... (your existing imports)

const getAllRegistered = errorHandling.asyncHandler(async (req, res, next) => {
  const exp = await Expartriates.find().lean();
  const egy = await Egyptions.find().lean();
  const all = exp.concat(egy);

  // Check if the Excel file already exists
  const filePath = "output.xlsx";

  let workbook = new ExcelJS.Workbook();

  if (await fileExists(filePath)) {
    // If the file exists, load the existing workbook
    const existingData = await fs.readFile(filePath);
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(existingData);

    // Use the first worksheet in the existing workbook (or create a new one if none exists)
    const existingWorksheet =
      workbook.worksheets[0] || workbook.addWorksheet("Sheet 1");

    // If the worksheet is new, add column headers
    if (existingWorksheet.rowCount === 1) {
      const headers = Object.keys(all[0]);
      existingWorksheet.addRow(headers);
    }

    // Get existing IDs in the worksheet
    const existingIDs = new Set(
      existingWorksheet.getColumn(1).values.slice(1) // Assuming ID is in the first column
    );

    // Add data rows if the record with a specific ID doesn't already exist
    all.forEach((row) => {
      if (!existingIDs.has(row.ID)) {
        const values = Object.values(row);
        existingWorksheet.addRow(values);
      }
    });
  } else {
    // If the file doesn't exist, create a new workbook and worksheet
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add column headers
    const headers = Object.keys(all[0]);
    worksheet.addRow(headers);

    // Add data rows
    all.forEach((row) => {
      const values = Object.values(row);
      worksheet.addRow(values);
    });
  }

  // Save the workbook to the file
  await workbook.xlsx.writeFile(filePath);

  return res.json(all);
});

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { getAllRegistered };
