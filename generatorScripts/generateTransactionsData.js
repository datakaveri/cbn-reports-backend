const fs = require("fs");

const generateDummyData = () => {
  const rows = [];
  for (let i = 1; i <= 1000; i++) {
    const transactionId = `TXN${i.toString().padStart(4, "0")}`;
    const transactionDate = new Date().toISOString(); // Current timestamp
    const amount = (Math.random() * 1000).toFixed(2); // Random amount between 0 and 1000
    const transactionFee = (Math.random() * 50).toFixed(2); // Random fee between 0 and 50
    const currencyCode = ["USD", "EUR", "INR", "GBP"][
      Math.floor(Math.random() * 4)
    ]; // Random currency
    const entity = `Entity${Math.ceil(Math.random() * 100)}`; // Random entity
    const merchantId = `MID${Math.ceil(Math.random() * 500)}`; // Random merchant ID
    const status = ["SUCCESS", "FAILED", "PENDING"][
      Math.floor(Math.random() * 3)
    ]; // Random status

    rows.push(
      `('${transactionId}', '${transactionDate}', ${amount}, ${transactionFee}, '${currencyCode}', '${entity}', '${merchantId}', '${status}')`
    );
  }
  return rows;
};

const generateSQL = () => {
  const rows = generateDummyData();
  const sql = `
INSERT INTO "Transaction" (
  "transactionId", "transactionDate", "amount", 
  "transactionFee", "currencyCode", "entity", "merchantId", "status"
) VALUES
${rows.join(",\n")};
  `;
  return sql;
};

// Write the SQL to a file
const sql = generateSQL();
fs.writeFileSync("init.sql", sql);

console.log("Dummy data SQL file generated: init.sql");
