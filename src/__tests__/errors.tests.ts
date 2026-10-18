import { GraphQLError } from "graphql";
import { BaseError, createErrorFormatter } from "../errors.js";
import { logger } from "../logger.js";

afterEach(() => {
	jest.restoreAllMocks();
});

test.each(["production", "development", "test", undefined])(
	"response stacks require explicit development mode (NODE_ENV=%s)",
	(environment) => {
		jest.replaceProperty(process, "env", { ...process.env });
		if (environment === undefined) delete process.env.NODE_ENV;
		else process.env.NODE_ENV = environment;
		const log = jest.spyOn(logger, "error").mockImplementation(() => {});
		const Sentry = { captureException: jest.fn() };
		const format = createErrorFormatter(Sentry);
		const originalError = new BaseError("Test error", "test-error");
		const error = new GraphQLError("Test error", { originalError });
		error.stack = "BaseError: Test error\n    at example";

		const response = format(error.toJSON(), error);

		expect(response.extensions).toMatchObject({
			code: "test-error",
			type: "BaseError",
		});
		if (environment === "development") {
			expect(response.extensions?.stack).toEqual(error.stack.split("\n"));
		} else {
			expect(response.extensions).not.toHaveProperty("stack");
			expect(response.extensions).not.toHaveProperty("stacktrace");
		}
		expect(log).toHaveBeenCalledWith(originalError);
		expect(Sentry.captureException).toHaveBeenCalledWith(
			error,
			expect.any(Object),
		);
	},
);

test("production strips Apollo response stacks without changing the input", () => {
	jest.replaceProperty(process, "env", { NODE_ENV: "production" });
	jest.spyOn(logger, "error").mockImplementation(() => {});
	const format = createErrorFormatter(undefined);
	const formatted = {
		message: "Test error",
		extensions: {
			code: "INTERNAL_SERVER_ERROR",
			stack: ["private"],
			stacktrace: ["private"],
		},
	};
	const response = format(formatted, new Error("Test error"));

	expect(response.extensions).not.toHaveProperty("stack");
	expect(response.extensions).not.toHaveProperty("stacktrace");
	expect(formatted.extensions.stack).toEqual(["private"]);
	expect(formatted.extensions.stacktrace).toEqual(["private"]);
});
