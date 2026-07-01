"use server";
import { getInjection } from "@/di";

export const getUsers = async (parsedInput: { page: number; pageSize: number; q: string }) => {
	const userModule = getInjection("userModule");
	const usersData = await userModule.getUsersUseCase({
		page: parsedInput.page,
		pageSize: parsedInput.pageSize,
		q: parsedInput.q,
	});
	return usersData;
};
