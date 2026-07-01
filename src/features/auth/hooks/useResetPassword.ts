import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../actions/reset-password";
export const useResetPassword = () => {
	return useMutation({
		mutationFn: resetPassword,
	});
};
