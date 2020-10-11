const fs = require("fs");
const processCsv = require("./processCSV");

const csv = fs.readFileSync("./data.csv").toString();

const result = processCsv.parseCSV(csv);

console.log(result);
