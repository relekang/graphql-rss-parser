import { pino } from "pino";

export let logger: pino.Logger;

export type LoggingOptions = {
	pretty: boolean;
	level: pino.LevelWithSilent;
};

export function createLogger(options?: LoggingOptions): pino.Logger {
	logger = pino({
		level: options?.level ?? "info",
		transport: options?.pretty
			? {
					target: "pino-pretty",
				}
			: undefined,
	});
	return logger;
}
