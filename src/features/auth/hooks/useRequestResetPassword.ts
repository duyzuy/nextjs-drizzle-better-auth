import { useMutation } from "@tanstack/react-query";
import { requestResetPassword } from "../actions/request-reset-password";

export const useRequestResetPassword = () => {
	return useMutation({
		mutationFn: requestResetPassword,
	});
};
