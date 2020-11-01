const fs = require("fs");
const processCsv = require("./processCSV");
const namesToAbb = require("./namesToAbb");

const csv = fs.readFileSync("./data.csv").toString();

const result = processCsv.parseCSV(csv);
const renamed = processCsv.renameKeys(result, namesToAbb);


console.log(renamed);
