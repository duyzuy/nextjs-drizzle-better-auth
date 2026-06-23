import type { SignInWithEmailDto, SignUpWithEmailDto } from "@/entities/auth/model/auth";
import type { IAuthRepository } from "@/entities/auth/model/auth.repo";
import type { AuthUser } from "@/entities/auth/model/auth-user";
import type { AuthDomainRules } from "./auth.policy";

export class AuthService {
	constructor(
		private authRepository: IAuthRepository,
		private authDomainRule: AuthDomainRules,
	) {}

	async signUp(signUpInput: SignUpWithEmailDto): Promise<AuthUser> {
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
	}

	async signIn(signInInput: SignInWithEmailDto): Promise<AuthUser> {
		this.authDomainRule.validateSignIn(signInInput);
		const userSignIn = await this.authRepository.signInWithEmail({
			email: signInInput.email,
			password: signInInput.password,
			rememberMe: signInInput.rememberMe,
		});
		return userSignIn;
	}
}
