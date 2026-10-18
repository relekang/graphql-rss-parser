export default {
	transform: {
		"^.+\\.(mjs|[tj]s)$": "@swc/jest",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!nock/|@mswjs/interceptors/|rettime/|@open-draft/until/|normalize-url/|cmd-ts/|chalk/|strip-ansi/|ansi-regex/)",
	],
	extensionsToTreatAsEsm: [".ts"],
	testEnvironment: "node",
	coverageDirectory: "./coverage/",
	testRegex: "/__tests__/.*\\.tests\\.ts$",
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
