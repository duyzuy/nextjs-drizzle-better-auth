import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const resetPasswordUseCase =
	(authenticationService: IAuthenticationService) =>
	async (input: { newPassword: string; token: string }) => {
		try {
			const data = await authenticationService.resetPassword({
				newPassword: input.newPassword,
				token: input.token,
			});
			return data;
		} catch (error) {
			throw new Error("usecase: reset password failed");
		}
	};
