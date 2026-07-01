import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../actions/get-users";

export const useGetUsers = (params: { page: number; pageSize: number; q: string }) => {
	return useQuery({
		queryKey: ["GET_USERS", params],
		queryFn: () => getUsers({ page: params.page, pageSize: params.pageSize, q: params.q }),
	});
};
