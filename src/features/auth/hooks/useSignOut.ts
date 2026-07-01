import { useMutation } from "@tanstack/react-query";
import { signOut } from "../actions/signout.action";
export const useSignOut = () => {
	return useMutation({
		mutationFn: signOut,
	});
};
