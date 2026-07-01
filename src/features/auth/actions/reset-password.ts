import z from "zod";
import { getInjection } from "@/di";

const requestResetPasswordSchema = z
	.object({
		password: z.string(),
		passwordConfirm: z.string(),
		redirectTo: z.string(),
	})
	.refine((ctx) => ctx.password === ctx.passwordConfirm, {
		error: "Password not match.",
	});

export const resetPassword = async (input: { password: string; token: string }) => {
	const resetPasswordUseCase = getInjection("resetPasswordUseCase");
	const data = await resetPasswordUseCase({
		newPassword: input.password,
		token: input.token,
	});
	return data;
};
