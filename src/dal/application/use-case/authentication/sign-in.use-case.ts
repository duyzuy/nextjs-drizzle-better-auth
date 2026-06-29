import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const signInWithEmailUseCase =
	(authenticationService: IAuthenticationService) =>
	async (dto: {
		email: string;
		password: string;
		rememberMe?: boolean;
		callbackUrl?: string;
	}) => {
		try {
			const data = await authenticationService.signInWithEmail({
				email: dto.email,
				password: dto.password,
				rememberMe: dto.rememberMe,
				callbackUrl: dto.callbackUrl,
			});
			return data;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Signin failed";
			throw new Error(errorMessage);
		}
	};
