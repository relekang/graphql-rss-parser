import type { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { cli } from "../cli.js";
import { logger } from "../logger.js";

jest.mock("@apollo/server/standalone");
jest.mock("cmd-ts", () => {
	const actual = jest.requireActual("cmd-ts");
	return { ...actual, run: actual.dryRun };
});

beforeEach(() => {
	jest.replaceProperty(process, "env", { NODE_ENV: "test" });
	jest.replaceProperty(process, "argv", ["node", "cli.js"]);
	jest.spyOn(logger, "info").mockImplementation(() => {});
	jest
		.mocked(startStandaloneServer)
		.mockResolvedValue({ url: "http://localhost:3000" });
});

afterEach(() => {
	jest.restoreAllMocks();
});

function createServer() {
	return jest.fn(async () => ({ logger }) as unknown as ApolloServer);
}

test("CLI defaults to info-level JSON logs", async () => {
	const server = createServer();
	await cli({ version: "test", createServer: server });
	expect(server).toHaveBeenCalledWith(
		expect.objectContaining({
			loggingOptions: { level: "info", pretty: false },
		}),
	);
});

test("CLI honors logging flags over environment values", async () => {
	process.env.LOG_LEVEL = "error";
	process.env.PRETTY_LOG = "false";
	process.argv.push("--log-level", "debug", "--pretty-log");
	const server = createServer();
	await cli({ version: "test", createServer: server });
	expect(server).toHaveBeenCalledWith(
		expect.objectContaining({
			loggingOptions: { level: "debug", pretty: true },
		}),
	);
});

test.each(["true", "false"])(
	"CLI honors logging environment values with PRETTY_LOG=%s",
	async (pretty) => {
		process.env.LOG_LEVEL = "silent";
		process.env.PRETTY_LOG = pretty;
		const server = createServer();
		await cli({ version: "test", createServer: server });
		expect(server).toHaveBeenCalledWith(
			expect.objectContaining({
				loggingOptions: { level: "silent", pretty: pretty === "true" },
			}),
		);
	},
);

test.each(["flag", "environment"])(
	"CLI rejects invalid log levels from %s",
	async (source) => {
		if (source === "flag") process.argv.push("--log-level", "invalid");
		else process.env.LOG_LEVEL = "invalid";
		const server = createServer();
		const result = await cli({ version: "test", createServer: server });
		expect(result).toHaveProperty("error");
		expect(server).not.toHaveBeenCalled();
	},
);
