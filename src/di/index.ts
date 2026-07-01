import type { IAuthenticationService } from "@/dal/application/services/authentication.service.interface";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { UserRepository } from "@/dal/infrastructure/repositories/user.repository";
import { BetterAuthenticationService } from "@/dal/infrastructure/services/better-authentication.service";
import { createAuthModule } from "./modules/authentication";
import { createUserModule } from "./modules/user";

class AppContainer {
	//services
	authenticationService: IAuthenticationService = new BetterAuthenticationService();

	//repository
	userRepository: IUserRepository = new UserRepository();

	//use-case
	authModule = createAuthModule(this.authenticationService);

	userModule = createUserModule(this.userRepository);
}
const appContainer = new AppContainer();

type InjectionKey = keyof AppContainer;

export const getInjection = <K extends InjectionKey>(name: K) => {
	return appContainer[name];
};
