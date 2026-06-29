export class OperationError extends Error {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message, { cause });
	}
}

export class ExternalApiError extends Error {
	constructor(
		public message: string,
		cause?: unknown,
	) {
		super(message, { cause });
	}
}
