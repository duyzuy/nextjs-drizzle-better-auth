export type SignUpWithEmailInput = {
	name: string;
	email: string;
	password: string;
	image?: string;
	callbackURL?: string;
};

export type SignInWithEmailInput = {
	email: string;
	password: string;
	rememberMe?: boolean;
	callbackUrl?: string;
};

export type VerifyEmailInput = {
	email: string;
	callBackURL?: string;
};
export type AuthSignedInResult = {
	id: string;
	name: string;
	email: string;
	token: string;
	setCookies: string[];
};

export type AuthSignedUpResult = {
	id: string;
	email: string;
	name: string;
};

export type AuthSessionResult = {
	session: {
		id: string;
		createdAt: string;
		updatedAt: string;
		userId: string;
		expiresAt: string;
		token: string;
		ipAddress?: string;
		userAgent?: string;
	};
	user: {
		id: string;
		createdAt: string;
		updatedAt: string;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string;
	};
};
