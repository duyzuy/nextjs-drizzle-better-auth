import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const sendEmailVerificationUseCase =
	(authenticationService: IAuthenticationService) =>
	async (dto: { email: string; callbackUrl?: string }) => {
		try {
			const data = await authenticationService.sendVerificationEmail({
				email: dto.email,
				callBackURL: dto.callbackUrl,
			});
			return data;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Send email verification failed";
			throw new Error(errorMessage);
		}
	};
