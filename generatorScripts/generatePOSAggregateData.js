const fs = require("fs");

const generateDummyData = () => {
	const rows = [];
	const startDate = new Date("2025-04-07");
	const endDate = new Date("2025-04-14");
	const posIds = Array.from(
		{ length: 52 },
		(_, i) => `POS_${(i + 1).toString().padStart(3, "0")}`
	);

	// List of predefined card numbers
	const cardNumbers = [
		"12345678",
		"12345679",
		"12345680",
		"12345681",
		"12345682",
		"12345683",
		"12345684",
		"12345685",
		"12345686",
		"12345687",
		"12345688",
		"12345689",
		"12345690",
		"12345691",
		"12345692",
		"12345693",
		"12345694",
		"12345695",
		"12345696",
		"12345697",
		"12345698",
		"12345699",
		"12345700",
	];

	for (let i = 1; i <= 1000; i++) {
		// Random card number from the list
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
			`('${
				cardNumbers[Math.floor(Math.random() * cardNumbers.length)]
			}', '${posId}', '${formattedDate}', ${hour}, ${volume}, ${count}, '${transactionType}')`
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
