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
};

export type VerifyEmailDto = {
	email: string;
	callBackURL?: string;
};
