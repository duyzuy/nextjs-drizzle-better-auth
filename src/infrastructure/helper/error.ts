export class InfrastructureError extends Error {
	constructor(
		message: string,
		public readonly cause?: unknown,
	) {
		super(message);
		this.name = "InfrastructurError";
	}
}

export class DatabaseError extends Error {
	constructor(
		message: string,
		public readonly cause: unknown,
	) {
		super(message);
		this.name = "DatabaseError";
	}
}

export class AuthProviderError extends Error {
	constructor(
		message: string,
		public readonly cause?: unknown,
	) {
		super(message);
		this.name = "AuthProviderError";
	}
}
