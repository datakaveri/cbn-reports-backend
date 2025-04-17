const express = require("express");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use("/api", transactionRoutes);

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
