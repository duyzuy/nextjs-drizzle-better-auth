export class DomainError extends Error {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message);
	}
}
