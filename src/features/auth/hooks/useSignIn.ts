import { useMutation } from "@tanstack/react-query";
import { signIn } from "../actions/signin.action";
export const useSignIn = () => {
	return useMutation({
		mutationFn: signIn,
	});
};
