"use server";
import { appContainer, getInjection } from "@/dal/container";
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
			const authService = getInjection("authService");

			const data = await authService.signUpWithEmail({
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
			const errorMessage = err instanceof Error ? err.message : "unknown error";
			return { status: "error", message: errorMessage };
		}
	});
