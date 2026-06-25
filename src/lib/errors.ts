import type { APIError } from "better-auth";
import type { DrizzleQueryError } from "drizzle-orm";
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

export type DalReturn<T, E extends DalError = DalError> = DalReturnError<E> | DalReturnSuccess<T>;

export type DalReturnError<E> = {
	success: false;
	error: E;
};
export type DalReturnSuccess<T> = {
	success: true;
	data: T;
};

export type DalError =
	| {
			type: "no-user";
	  }
	| {
			type: "no-access";
	  }
	| {
			type: "drizzle-error";
			error: DrizzleQueryError;
	  }
	| {
			type: "better-auth-error";
			error: APIError;
	  }
	| {
			type: "unknown-error";
			error: unknown;
	  };

export class ThrowableDalError extends Error {
	dalError: DalError;

	constructor(dalError: DalError) {
		super("ThrowableDalError");
		this.dalError = dalError;
	}
}

export function createSuccessReturn<T>(data: T): DalReturn<T> {
	return { success: true, data };
}

export function createErrorReturn<E extends DalError>(error: E): DalReturn<never> {
	return { success: false, error };
}
