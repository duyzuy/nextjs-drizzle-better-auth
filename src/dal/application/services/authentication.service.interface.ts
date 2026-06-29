import type {
	AuthSessionResult,
	AuthSignedInResult,
	AuthSignedUpResult,
	RequestResetPasswordInput,
	RequestResetPasswordResult,
	ResetPasswordInput,
	ResetPasswordResult,
	SignInWithEmailInput,
	SignUpWithEmailInput,
	VerifyEmailInput,
} from "@/dal/domain/auth/auth.model";

export interface IAuthenticationService {
	signInWithEmail(input: SignInWithEmailInput): Promise<AuthSignedInResult>;
	signUpWithEmail(input: SignUpWithEmailInput): Promise<AuthSignedUpResult>;
	signOut({ headers }: { headers: Headers }): Promise<{ success: boolean; setCookies: string[] }>;
	sendVerificationEmail(input: VerifyEmailInput): Promise<boolean>;
	getSession({ headers }: { headers: Headers }): Promise<AuthSessionResult | null>;
	requestResetPassword(input: RequestResetPasswordInput): Promise<RequestResetPasswordResult>;
	resetPassword(input: ResetPasswordInput): Promise<ResetPasswordResult>;
}
