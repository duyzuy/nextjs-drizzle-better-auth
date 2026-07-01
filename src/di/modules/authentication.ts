import type { IAuthenticationService } from "@/dal/application/services/authentication.service.interface";
import { getSessionUseCase } from "@/dal/application/use-case/authentication/get-session.use-case";
import { requestResetPasswordUseCase } from "@/dal/application/use-case/authentication/request-reset-password.use-case";
import { resetPasswordUseCase } from "@/dal/application/use-case/authentication/reset-password.use-case";
import { signInWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-in.use-case";
import { signOutUseCase } from "@/dal/application/use-case/authentication/sign-out.use-case";
import { signUpWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-up.use-case";

export const createAuthModule = (authenticationService: IAuthenticationService) => {
	return {
		signInWithEmailUseCase: signInWithEmailUseCase(authenticationService),
		signUpWithEmailUseCase: signUpWithEmailUseCase(authenticationService),
		signOutUseCase: signOutUseCase(authenticationService),
		requestResetPasswordUseCase: requestResetPasswordUseCase(authenticationService),
		resetPasswordUseCase: resetPasswordUseCase(authenticationService),
		getSessionUseCase: getSessionUseCase(authenticationService),
	};
};
