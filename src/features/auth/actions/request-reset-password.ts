import z from "zod";
import { getInjection } from "@/di";

export const requestResetPassword = async (input: { email: string; redirectTo: string }) => {
	const authModule = getInjection("authModule");

	const data = await authModule.requestResetPasswordUseCase({
		email: input.email,
		redirectTo: input.redirectTo,
	});
};
