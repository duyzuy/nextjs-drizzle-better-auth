import type {
	AuthSession,
	AuthSignedIn,
	AuthSignedUp,
	SignInWithEmailDto,
	SignUpWithEmailDto,
	VerifyEmailDto,
} from "./auth";

export interface IAuthRepository {
	signInWithEmail(dto: SignInWithEmailDto): Promise<AuthSignedIn>;
	signUpWithEmail(dto: SignUpWithEmailDto): Promise<AuthSignedUp>;
	signOut(): Promise<{ success: boolean; setCookies: string[] }>;
	verifyEmail(dto: VerifyEmailDto): Promise<boolean>;
	getSession: () => Promise<AuthSession | null>;
}
