export class AuthenticationError extends Error {
	public statusCode: number;
	constructor(
		public message: string,
		statusCode: number,
		options?: ErrorOptions,
	) {
		super(message, options);
		this.statusCode = statusCode;
	}
}
