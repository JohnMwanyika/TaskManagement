const { jsPDF } = require("jspdf");
// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

function generateReport() {
  doc.text(
    "The following is a summary of John's Tasks and the progress",
    10,
    10
  );

  doc.save("a4.pdf");
}

module.exports = generateReport;
