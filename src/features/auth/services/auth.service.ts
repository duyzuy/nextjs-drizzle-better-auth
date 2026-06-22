import type { SignInWithEmailDto, SignUpWithEmailDto } from "@/entities/auth/model/auth";
import type { IAuthRepository } from "@/entities/auth/model/auth.repo";
import type { AuthUser } from "@/entities/auth/model/auth-user";
import { DomainError } from "@/entities/errors/common";
import { InfrastructureError } from "@/infrastructure/helper/error";
import { AuthDomainRules } from "./auth.policy";

export class AuthService {
	private authDomainRule = new AuthDomainRules();

	constructor(private authRepository: IAuthRepository) {}

	async signUp(signUpInput: SignUpWithEmailDto): Promise<AuthUser> {
		try {
			this.authDomainRule.validateSignUp({
				email: signUpInput.email,
				name: signUpInput.name,
				password: signUpInput.password,
			});

			const userSignUp = await this.authRepository.signUpWithEmail({
				email: signUpInput.email,
				image: signUpInput.image,
				name: signUpInput.name,
				password: signUpInput.password,
				callbackURL: signUpInput.callbackURL,
			});

			return userSignUp;
		} catch (error) {
			this.throwServiceError(error);
		}
	}

	async signIn(signInInput: SignInWithEmailDto) {
		try {
			this.authDomainRule.validateSignIn(signInInput);
			const userSignIn = await this.authRepository.signInWithEmail({
				email: signInInput.email,
				password: signInInput.password,
				rememberMe: signInInput.rememberMe,
			});
			return userSignIn;
		} catch (error) {
			this.throwServiceError(error);
		}
	}

	private throwServiceError(error: unknown): never {
		if (error instanceof DomainError) {
			throw error;
		}
		if (error instanceof InfrastructureError) {
			throw new DomainError(error.message, error);
		}

		throw new Error("Auth service unexpected error.");
	}
}
