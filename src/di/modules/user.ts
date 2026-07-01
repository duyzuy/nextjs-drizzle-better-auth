import { getUsersUseCase } from "@/dal/application/use-case/user/get-users.use-case";
import type { IUserRepository } from "@/dal/domain/user/user.repo";

export const createUserModule = (userRepository: IUserRepository) => {
	return {
		getUsersUseCase: getUsersUseCase(userRepository),
	};
};
