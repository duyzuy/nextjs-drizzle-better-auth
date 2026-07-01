import type { IAuthenticationService } from "@/dal/application/services/authentication.service.interface";
import { PaginationService } from "@/dal/application/services/pagination.service";
import { getSessionUseCase } from "@/dal/application/use-case/authentication/get-session.use-case";
import { requestResetPasswordUseCase } from "@/dal/application/use-case/authentication/request-reset-password.use-case";
import { resetPasswordUseCase } from "@/dal/application/use-case/authentication/reset-password.use-case";
import { signInWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-in.use-case";
import { signOutUseCase } from "@/dal/application/use-case/authentication/sign-out.use-case";
import { signUpWithEmailUseCase } from "@/dal/application/use-case/authentication/sign-up.use-case";
import { getUsersUseCase } from "@/dal/application/use-case/user/get-users.use-case";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { UserRepository } from "@/dal/infrastructure/repositories/user.repository";
import { BetterAuthenticationService } from "@/dal/infrastructure/services/better-authentication.service";

class AppContainer {
	//services
	authenticationService: IAuthenticationService = new BetterAuthenticationService();

	//repository
	userRepository: IUserRepository = new UserRepository(new PaginationService());

	//use-case
	signInWithEmailUseCase = signInWithEmailUseCase(this.authenticationService);
	signUpWithEmailUseCase = signUpWithEmailUseCase(this.authenticationService);
	signOutUseCase = signOutUseCase(this.authenticationService);
	requestResetPasswordUseCase = requestResetPasswordUseCase(this.authenticationService);
	resetPasswordUseCase = resetPasswordUseCase(this.authenticationService);
	getSessionUseCase = getSessionUseCase(this.authenticationService);

	getUserUseCase = getUsersUseCase(this.userRepository);
}
const appContainer = new AppContainer();

type InjectionKey = keyof AppContainer;

export const getInjection = <K extends InjectionKey>(name: K) => {
	return appContainer[name];
};
