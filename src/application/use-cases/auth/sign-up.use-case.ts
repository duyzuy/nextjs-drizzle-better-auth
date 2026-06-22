import { authRepository } from "@/infrastructure/repositories/auth/auth.repository";

export const signUpUseCase = (input: { email: string; password: string }) => {
	return authRepository.signup({ email: "", password: "" });
};
