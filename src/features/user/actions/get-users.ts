"use server";
import z from "zod";
import { getInjection } from "@/di";
import { actionClient } from "@/lib/safe-action";

type User = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	createdAt: string;
	updatedAt: string;
};
type GetUserReturn =
	| {
			status: "success";
			data: {
				page: number;
				pageSize: number;
				totalPage: number;
				totalItem: number;
				items: User[];
			};
	  }
	| {
			status: "error";
			message: string;
	  };

const GetUsersSchema = z.object({
	page: z.number().optional(),
	pageSize: z.number().optional(),
	q: z.string().optional(),
});

export const getUsersSafeAction = actionClient
	.inputSchema(GetUsersSchema)
	.action(async ({ parsedInput }): Promise<GetUserReturn> => {
		try {
			const getUserUseCase = getInjection("getUserUseCase");

			const usersData = await getUserUseCase({
				page: parsedInput.page,
				pageSize: parsedInput.pageSize,
				q: parsedInput.q,
			});

			return {
				status: "success",
				data: {
					totalItem: usersData.totalItem,
					totalPage: usersData.totalPage,
					items: usersData.items,
					page: usersData.page,
					pageSize: usersData.pageSize,
				},
			};
		} catch (error) {
			console.log(error);
			return {
				status: "error",
				message: "Khong the lay du lieu",
			};
		}
	});

export const getUsers = async (parsedInput: { page: number; pageSize: number; q: string }) => {
	const getUserUseCase = getInjection("getUserUseCase");
	const usersData = await getUserUseCase({
		page: parsedInput.page,
		pageSize: parsedInput.pageSize,
		q: parsedInput.q,
	});
	return usersData;
};
