import { useMutation } from "@tanstack/react-query";
import { signUp } from "../actions/signup.action";
export const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
	});
};
