import { AuthService } from "../infrastructure/services/auth.service";

export class AppContainer {
	authService = new AuthService();
}
export const appContainer = new AppContainer();

type ContainerName = {
	authService: "authService";
};

export const getInjection = (name: keyof ContainerName) => {
	return appContainer[name];
};
