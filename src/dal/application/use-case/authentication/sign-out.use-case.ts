import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const signOutUseCase =
	(authenticationService: IAuthenticationService) =>
	async ({ headers }: { headers: Headers }) => {
		try {
			return await authenticationService.signOut({ headers });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Signout failed";
			throw new Error(errorMessage);
		}
	};
