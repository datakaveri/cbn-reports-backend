module.exports = {
	testEnvironment: "node",
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov"],
	collectCoverageFrom: [
		"src/**/*.js",
		"!src/index.js", // Exclude entry point
		"!src/utils/logger.js", // Exclude logger utility
	],
};
