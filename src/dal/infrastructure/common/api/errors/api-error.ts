export class ApiError extends Error {
	status: number;
	code: string;
	meta: unknown;
	data?: unknown;

	constructor(status: number, code: string, message: string, meta: unknown, data?: unknown) {
		super(message);
		this.name = "HttpError";
		this.status = status;
		this.data = data;
		this.code = code;
		this.meta = meta;

		Object.setPrototypeOf(this, new.target.prototype);

		// Proper stack trace (Node.js)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}
}
