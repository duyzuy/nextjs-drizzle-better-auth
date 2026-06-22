import { useMutation } from "@tanstack/react-query";
import { authRepository } from "@/infrastructure/repositories/auth/auth.repository";

const useSignout = () => {
	return useMutation({
		mutationFn: () => authRepository.signout({ credentials: "include" }),
	});
};
export default useSignout;
