export class InputParseError<TFields> extends Error {
	constructor(
		message: string,
		public readonly fields: TFields,
	) {
		super(message);
		this.name = "InputParseError";
	}
}

export class InfrastructureError extends Error {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message);
	}
}

export class DomainError extends Error {
	constructor(
		message: string,
		public cause?: unknown,
	) {
		super(message);
	}
}

export class DatabaseOperationError extends Error {
	constructor(
		message: string,
		public readonly cause: unknown,
	) {
		super(message);
		this.name = "DatabaseError";
	}
}
