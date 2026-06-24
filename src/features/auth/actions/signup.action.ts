"use server";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { authService } from "@/dal/controller/auth.controller";
import { actionClient } from "@/lib/safe-action";
import { SignUpWithEmailSchema } from "./auth.schema";

type SignUpSuccessReturn = {
	status: "success";
	data: {
		id: string;
		name: string;
	};
};

type SignUpErrorReturn = { status: "error"; message: string };
type SignUpReturn = SignUpSuccessReturn | SignUpErrorReturn;

export const signupSafeAction = actionClient
	.use(async ({ next }) => {
		return next();
	})
	.inputSchema(SignUpWithEmailSchema)
	.action(async ({ parsedInput }): Promise<SignUpReturn> => {
		try {
			const data = await authService.signUp({
				email: parsedInput.email,
				name: parsedInput.name,
				password: parsedInput.password,
				callbackURL: parsedInput.callbackURL ?? undefined,
				image: parsedInput.image ?? undefined,
			});
			return {
				status: "success",
				data: {
					id: data.id,
					name: data.name,
				},
			};
		} catch (err) {
			if (err instanceof APIError) {
				return { status: "error", message: err.message };
			}
			const errorMessage = err instanceof Error ? err.message : "unknown error";
			return { status: "error", message: errorMessage };
		}
	});
