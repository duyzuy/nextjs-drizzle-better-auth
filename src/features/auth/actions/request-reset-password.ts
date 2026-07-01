import z from "zod";
import { getInjection } from "@/di";

export const requestResetPassword = async (input: { email: string; redirectTo: string }) => {
	const requestResetPassword = getInjection("requestResetPasswordUseCase");

	const data = await requestResetPassword({
		email: input.email,
		redirectTo: input.redirectTo,
	});
};
