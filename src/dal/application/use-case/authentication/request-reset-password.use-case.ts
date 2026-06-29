import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const requestResetPasswordUseCase =
	(authenticationService: IAuthenticationService) =>
	async (input: { email: string; redirectTo: string }) => {
		try {
			const data = await authenticationService.requestResetPassword({
				email: input.email,
				redirectTo: input.redirectTo,
			});
			return data;
		} catch (error) {
			throw new Error("usecase: request reset password failed");
		}
	};
