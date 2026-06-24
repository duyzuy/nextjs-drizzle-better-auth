import type {
	AuthSignedIn,
	AuthSignedUp,
	SignInWithEmailDto,
	SignUpWithEmailDto,
} from "@/entities/auth/model/auth";
import type { IAuthRepository } from "@/entities/auth/model/auth.repo";
import type { AuthDomainRules } from "./auth.policy";

export class AuthService {
	constructor(
		private authRepository: IAuthRepository,
		private authDomainRule: AuthDomainRules,
	) {}

	async signUp(signUpInput: SignUpWithEmailDto): Promise<AuthSignedUp> {
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

	async signIn(signInInput: SignInWithEmailDto): Promise<AuthSignedIn> {
		this.authDomainRule.validateSignIn(signInInput);
		return this.authRepository.signInWithEmail({
			email: signInInput.email,
			password: signInInput.password,
			rememberMe: signInInput.rememberMe,
		});
	}

	async getSession() {
		return this.authRepository.getSession();
	}
	async signOut() {
		return this.authRepository.signOut();
	}

	async verifyEmail(email: string, callbackUrl?: string): Promise<boolean> {
		return this.authRepository.verifyEmail({
			email,
			callBackURL: callbackUrl,
		});
	}
}
