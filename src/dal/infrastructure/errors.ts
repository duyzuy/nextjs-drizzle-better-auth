export class InvalidCredentialsError extends Error {
	constructor(
		public message: string,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}

export class ExternalApiError extends Error {
	constructor(
		public message: string,
		options?: ErrorOptions,
	) {
		super(message, options);
	}
}
