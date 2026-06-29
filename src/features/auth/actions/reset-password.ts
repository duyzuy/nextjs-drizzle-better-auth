import z from "zod";
import { getInjection } from "@/di";
import { actionClient } from "@/lib/safe-action";

const requestResetPasswordSchema = z
	.object({
		password: z.string(),
		passwordConfirm: z.string(),
		redirectTo: z.string(),
	})
	.refine((ctx) => ctx.password === ctx.passwordConfirm, {
		error: "Password not match.",
	});

export const requestResetPassword = actionClient
	.inputSchema(requestResetPasswordSchema)
	.action(async ({ parsedInput }) => {
		try {
			const resetPasswordUseCase = getInjection("resetPasswordUseCase");

			const data = await resetPasswordUseCase({
				newPassword: parsedInput.password,
				token: "",
			});

			return {
				status: "success",
			};
		} catch (error) {
			console.log(error);

			return {
				status: "error",
			};
		}
	});
