import { AuthenticationError } from "@/dal/domain/errors/auth";
import type { IAuthenticationService } from "../../services/authentication.service.interface";

export const getSessionUseCase =
	(authenticationService: IAuthenticationService) => async (input: { headers: Headers }) => {
		const session = await authenticationService.getSession({ headers: input.headers });
		if (!session) {
			throw new AuthenticationError("Session Expired", 401);
		}
		return session;
	};
