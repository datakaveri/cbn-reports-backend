const swaggerUi = require("swagger-ui-express");
const docsService = require("../services/docs/docsService");

const serveDocs = (req, res, next) => {
	try {
		const swaggerDocument = docsService.getSwaggerDocument();
		swaggerUi.setup(swaggerDocument)(req, res, next);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	serveDocs,
};
