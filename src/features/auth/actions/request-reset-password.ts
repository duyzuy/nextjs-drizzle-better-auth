import z from "zod";
import { getInjection } from "@/di";
import { actionClient } from "@/lib/safe-action";

const requestResetPasswordSchema = z.object({
	email: z.string(),
	redirectTo: z.string(),
});
export const requestResetPassword = actionClient
	.inputSchema(requestResetPasswordSchema)
	.action(async ({ parsedInput }) => {
		try {
			const requestResetPassword = getInjection("requestResetPasswordUseCase");

			const data = await requestResetPassword({
				email: parsedInput.email,
				redirectTo: parsedInput.redirectTo,
			});
			return {
				status: "success",
				data,
			};
		} catch (error) {
			console.log(error);

			return {
				status: "error",
			};
		}
	});
