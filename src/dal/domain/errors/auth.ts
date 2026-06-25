export class AuthenticationError extends Error {
	constructor(
		public message: string,
		options: ErrorOptions,
	) {
		super(message, options);
	}
}
