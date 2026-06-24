export type SignUpWithEmailDto = {
	name: string;
	email: string;
	password: string;
	image?: string;
	callbackURL?: string;
};

export type SignInWithEmailDto = {
	email: string;
	password: string;
	rememberMe?: boolean;
	callbackUrl?: string;
};

export type VerifyEmailDto = {
	email: string;
	callBackURL?: string;
};
export type AuthSignedIn = {
	id: string;
	name: string;
	email: string;
	token: string;
	setCookies: string[];
};

export type AuthSignedUp = {
	id: string;
	email: string;
	name: string;
};
export type AuthSession = {
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
