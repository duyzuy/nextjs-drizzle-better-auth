import type {
	AuthSessionResult,
	AuthSignedInResult,
	AuthSignedUpResult,
	SignInWithEmailInput,
	SignUpWithEmailInput,
	VerifyEmailInput,
} from "@/dal/domain/auth/auth.model";

export interface IAuthService {
	signInWithEmail(input: SignInWithEmailInput): Promise<AuthSignedInResult>;
	signUpWithEmail(input: SignUpWithEmailInput): Promise<AuthSignedUpResult>;
	signOut(): Promise<{ success: boolean; setCookies: string[] }>;
	sendEmailVerification(input: VerifyEmailInput): Promise<boolean>;
	getSession({ headers }: { headers: Headers }): Promise<AuthSessionResult | null>;
}
