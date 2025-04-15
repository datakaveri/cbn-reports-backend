const fs = require("fs");

const generateDummyData = () => {
  const rows = [];
  for (let i = 1; i <= 1000; i++) {
    const posId = `POS${i.toString().padStart(4, "0")}`; // Unique POS ID
    const businessLocation = `Location${Math.ceil(Math.random() * 100)}`; // Random business location
    const acquirerCode = `ACQ${Math.ceil(Math.random() * 1000)}`; // Random acquirer code
    const cumulativeValue = (Math.random() * 100000).toFixed(2); // Random cumulative value between 0 and 100000
    const period = ["day", "week"][Math.floor(Math.random() * 2)]; // Random period ("day" or "week")

    rows.push(
      `('${posId}', '${businessLocation}', '${acquirerCode}', ${cumulativeValue}, '${period}')`
    );
  }
  return rows;
};

const generateSQL = () => {
  const rows = generateDummyData();
  const sql = `
INSERT INTO "POSCashLimit" (
  "posId", "businessLocation", "acquirerCode", "cumulativeValue", "period"
) VALUES
${rows.join(",\n")};
  `;
  return sql;
};

// Write the SQL to a file
const sql = generateSQL();
fs.writeFileSync("init_pos_cash_limit.sql", sql);

console.log("Dummy data SQL file generated: init_pos_cash_limit.sql");
