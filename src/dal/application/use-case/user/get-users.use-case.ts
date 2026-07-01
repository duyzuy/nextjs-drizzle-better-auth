import type { IUserRepository } from "@/dal/domain/user/user.repo";

export const getUsersUseCase =
	(userRepository: IUserRepository) =>
	async (dto?: { page?: number; pageSize?: number; q?: string }) => {
		try {
			const users = await userRepository.getLists({
				page: dto?.page,
				pageSize: dto?.pageSize,
			});
			return users;
		} catch (error) {
			console.log(error);
			throw new Error("Get user failed");
		}
	};
