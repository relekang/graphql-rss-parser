export default {
	transform: {
		"^.+\\.(t|j)s$": "@swc/jest",
	},
	extensionsToTreatAsEsm: [".ts"],
	testEnvironment: "node",
	coverageDirectory: "./coverage/",
	testRegex: "/__tests__/.*\\.tests\\.ts$",
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
