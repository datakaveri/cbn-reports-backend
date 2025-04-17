const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const getSwaggerDocument = () => {
	try {
		const swaggerFilePath = path.join(__dirname, "../../docs/swagger.yaml");
		const swaggerContent = fs.readFileSync(swaggerFilePath, "utf8");
		return yaml.parse(swaggerContent);
	} catch (error) {
		throw new Error(`Failed to load Swagger document: ${error.message}`);
	}
};

module.exports = {
	getSwaggerDocument,
};
