export abstract class AppError extends Error {
	constructor(message: string) {
		super(message);
	}
}
export class InputParseError<TFields> extends Error {
	constructor(
		message: string,
		public readonly fields: TFields,
	) {
		super(message);
		this.name = "InputParseError";
	}
}

export class BusinessError extends AppError {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message);
	}
}

export class DomainError extends AppError {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message);
	}
}
