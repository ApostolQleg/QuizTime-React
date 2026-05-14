export const LogLevel = {
	INFO: "INFO",
	DEBUG: "DEBUG",
	ERROR: "ERROR",
};

export const withLogger = (
	apiFunction,
	{ level = LogLevel.INFO, actionName = "API Call" } = {},
) => {
	return async (...args) => {
		const timestamp = new Date().toISOString();
		const start = performance.now();

		if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
			console.log(`[${timestamp}] [${level}] Input for ${actionName}:`, args);
		}

		try {
			const result = await apiFunction(...args);
			const executionTime = (performance.now() - start).toFixed(2);

			if (level === LogLevel.DEBUG) {
				const logData = result?.data !== undefined ? result.data : result;
				console.log(
					`[${timestamp}] [${level}] Success ${actionName} (${executionTime}ms). Result:`,
					logData,
				);
			} else if (level === LogLevel.INFO) {
				console.log(
					`[${timestamp}] [${level}] Success ${actionName} (${executionTime}ms).`,
				);
			}

			return result;
		} catch (error) {
			const executionTime = (performance.now() - start).toFixed(2);
			console.error(
				`[${timestamp}] [ERROR] Failed ${actionName} (${executionTime}ms):`,
				error.message,
			);
			throw error;
		}
	};
};
