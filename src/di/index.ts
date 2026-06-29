import type { IAuthenticationService } from "@/dal/application/services/authentication.service.interface";
import { UserService } from "@/dal/application/services/user.service";
import { getSessionUseCase } from "@/dal/application/use-case/authentication/get-session.use-case";
import { requestResetPasswordUseCase } from "@/dal/application/use-case/authentication/request-reset-password.use-case";
import { resetPasswordUseCase } from "@/dal/application/use-case/authentication/reset-password.use-case";
import { signInWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-in.use-case";
import { signOutUseCase } from "@/dal/application/use-case/authentication/sign-out.use-case";
import { signUpWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-up.use-case";
import { getUserUseCase } from "@/dal/application/use-case/user/get-users.use-case";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { userRepository } from "@/dal/infrastructure/repositories/user.repository";
import { betterAuthService } from "@/dal/infrastructure/services/better-authentication.service";

export class AppContainer {
	//services
	authenticationService: IAuthenticationService = betterAuthService;
	userService = new UserService();

	//repository
	userRepository: IUserRepository = userRepository;

	//use-case
	signInWithEmailUseCase = signInWithEmailUseCase(this.authenticationService);
	signUpWithEmailUseCase = signUpWithEmailUseCase(this.authenticationService);
	signOutUseCase = signOutUseCase(this.authenticationService);
	requestResetPasswordUseCase = requestResetPasswordUseCase(this.authenticationService);
	resetPasswordUseCase = resetPasswordUseCase(this.authenticationService);
	getSessionUseCase = getSessionUseCase(this.authenticationService);

	getUserUseCase = getUserUseCase(this.userRepository);
}
export const appContainer = new AppContainer();

export type InjectionKey = keyof AppContainer;

export const getInjection = <K extends InjectionKey>(name: K) => {
	return appContainer[name];
};
