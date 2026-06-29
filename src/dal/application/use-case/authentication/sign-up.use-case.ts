import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const signUpWithEmailUseCase =
	(authenticationService: IAuthenticationService) =>
	async (dto: {
		email: string;
		name: string;
		password: string;
		callbackURL?: string;
		image?: string;
	}) => {
		try {
			const data = await authenticationService.signUpWithEmail({
				email: dto.email,
				password: dto.password,
				callbackURL: dto.callbackURL,
				name: dto.name,
				image: dto.image,
			});
			return data;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Signup failed failed";
			throw new Error(errorMessage);
		}
	};
