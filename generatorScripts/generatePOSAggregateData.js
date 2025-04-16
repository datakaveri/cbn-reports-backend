const fs = require("fs");

const generateDummyData = () => {
	const rows = [];
	const startDate = new Date("2025-04-07");
	const endDate = new Date("2025-04-14");
	const posIds = Array.from(
		{ length: 52 },
		(_, i) => `POS_${(i + 1).toString().padStart(3, "0")}`
	);

	for (let i = 1; i <= 1000; i++) {
		const cardNumber = Math.floor(
			10000000 + Math.random() * 90000000
		).toString(); // Random 8-digit card number
		const posId = posIds[Math.floor(Math.random() * posIds.length)]; // Random POS_ID
		const date = new Date(
			startDate.getTime() + Math.random() * (endDate - startDate)
		); // Random date between 7/4/2025 and 14/4/2025
		const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
		const hour = Math.floor(Math.random() * 24); // Random hour (0-23)
		const volume = (Math.random() * (10000 - 1000) + 1000).toFixed(2); // Random volume between 1000 and 10000
		const count = Math.floor(Math.random() * 7) + 1; // Random count between 1 and 7
		const transactionType = ["Withdrawal", "Deposit"][
			Math.floor(Math.random() * 2)
		]; // Random transaction type

		rows.push(
			`('${cardNumber}', '${posId}', '${formattedDate}', ${hour}, ${volume}, ${count}, '${transactionType}')`
		);
	}
	return rows;
};

const generateSQL = () => {
	const rows = generateDummyData();
	const sql = `
INSERT INTO "POSAggregate" (
  "cardNumber", "posId", "date", "hour", "volume", "count", "transactionType"
) VALUES
${rows.join(",\n")};
  `;
	return sql;
};

// Write the SQL to a file
const sql = generateSQL();
fs.writeFileSync("init_pos_aggregate.sql", sql);

console.log("Dummy data SQL file generated: init_pos_aggregate.sql");
