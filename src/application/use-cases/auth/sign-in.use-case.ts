import { authRepository } from "@/infrastructure/repositories/auth/auth.repository";

export const signInUseCase = (input: { email: string; password: string }) => {
	return authRepository.signin(input);
};
