"use server";
import { revalidatePath } from "next/cache";
import z from "zod";
import { authService } from "@/dal/controller/auth.controller";
import { DomainError } from "@/dal/errors/common";
import { SignInWithEmailSchema } from "./auth.schema";

type SignInFieldsError = z.inferFlattenedErrors<typeof SignInWithEmailSchema>["fieldErrors"];
type SignInFields = Partial<z.input<typeof SignInWithEmailSchema>>;

export type SignInActionState =
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
			fields: SignInFields;
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
						fields: SignInFieldsError;
				  };
	  };

export async function signInAction(
	_: SignInActionState,
	formData: FormData,
): Promise<SignInActionState> {
	const inputs = {
		email: formData.get("name") as string,
		password: formData.get("password") as string,
	};

	try {
		const data = await authService.signIn(inputs);

		const parsInput = await SignInWithEmailSchema.safeParseAsync(inputs);
		if (!parsInput.success) {
			const fields = z.flattenError(parsInput.error).fieldErrors;
			return {
				status: "error",
				fields: inputs,
				error: {
					type: "validation",
					message: "Validation error",
					fields,
				},
			};
		}
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
