"use server";
import { revalidatePath } from "next/cache";
import z from "zod";
import { DomainError, InputParseError } from "@/entities/errors/common";
import { authService } from "../controller/auth.controller";

type SignupFieldsError = z.inferFlattenedErrors<typeof SignUpWithEmailSchema>["fieldErrors"];
type SignupFields = Partial<z.input<typeof SignUpWithEmailSchema>>;

import { SignUpWithEmailSchema } from "./auth.schema";

export type SignUpActionState =
	| { status: "idle" }
	| {
			status: "success";
			data: {
				id: string;
				name: string;
			};
	  }
	| {
			status: "error";
			fields: SignupFields;
			error:
				| {
						type: "business";
						message: string;
				  }
				| {
						type: "system";
						message: string;
				  }
				| {
						type: "validation";
						message: string;
						fields: SignupFieldsError;
				  };
	  };

export async function signupAction(
	_: SignUpActionState,
	formData: FormData,
): Promise<SignUpActionState> {
	const inputs = {
		email: formData.get("email") as string,
		name: formData.get("name") as string,
		password: formData.get("password") as string,
		passwordConfirm: formData.get("passwordConfirm") as string,
		callbackURL: formData.get("callbackURL") as string,
	};

	try {
		const validInput = await SignUpWithEmailSchema.safeParseAsync(inputs);

		if (!validInput.success) {
			return {
				status: "error",
				fields: inputs,
				error: {
					type: "validation",
					message: "Validation error",
					fields: z.flattenError(validInput.error).fieldErrors,
				},
			};
		}

		const data = await authService.signUp({
			email: validInput.data.email,
			name: validInput.data.name,
			password: validInput.data.password,
			callbackURL: validInput.data.callbackURL ?? undefined,
			image: validInput.data.image ?? undefined,
		});

		revalidatePath("/");
		return { status: "success", data: { id: data.id, name: data.name } };
	} catch (error) {
		if (error instanceof DomainError) {
			return {
				status: "error",
				fields: inputs,
				error: {
					type: "business",
					message: error.message,
				},
			};
		}
		return {
			status: "error",
			fields: inputs,
			error: {
				type: "system",
				message: "Unexpected server error",
			},
		};
	}
}

export async function signInAction(
	_: SignUpActionState,
	formData: FormData,
): Promise<SignUpActionState> {
	const inputs = {
		email: formData.get("email") as string,
		name: formData.get("name") as string,
		password: formData.get("password") as string,
		passwordConfirm: formData.get("passwordConfirm") as string,
		callbackURL: formData.get("callbackURL") as string,
	};

	try {
		const data = await authService.signUp(inputs);

		revalidatePath("/");
		return { status: "success", data: { id: data.id, name: data.name } };
	} catch (error) {
		if (error instanceof InputParseError) {
			return {
				status: "error",
				fields: inputs,
				error: {
					type: "validation",
					message: "Validation error",
					fields: error.fields,
				},
			};
		}
		if (error instanceof DomainError) {
			return {
				status: "error",
				fields: inputs,
				error: {
					type: "business",
					message: error.message,
				},
			};
		}
		return {
			status: "error",
			fields: inputs,
			error: {
				type: "system",
				message: "Unexpected server error",
			},
		};
	}
}
