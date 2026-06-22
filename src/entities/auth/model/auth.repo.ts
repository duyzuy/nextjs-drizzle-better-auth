import type { SignInWithEmailDto, SignUpWithEmailDto, VerifyEmailDto } from "./auth";
import type { AuthUser } from "./auth-user";

export interface IAuthRepository {
	signInWithEmail(dto: SignInWithEmailDto): Promise<AuthUser>;
	signUpWithEmail(dto: SignUpWithEmailDto): Promise<AuthUser>;
	signOut(): Promise<boolean>;
	verifyEmail(dto: VerifyEmailDto): Promise<boolean>;
}
