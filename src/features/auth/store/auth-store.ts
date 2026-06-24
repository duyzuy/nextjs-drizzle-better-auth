import type { StateCreator } from "zustand";

type AuthModalType = "signin" | "signup" | "forgot-password" | "verify-email";

export type AuthSliceState = {
	activeModal?: AuthModalType;
	session?: {
		id: string;
		userId: string;
		expiredAt: string;
		token: string;
		ipAddress?: string;
		userAgent?: string;
	};
	user?: {
		id: string;
		name: string;
		email: string;
		emailVerified: boolean;
		avatar?: string;
	};
};
export type AuthSliceAction = {
	showModal: (type: AuthModalType) => void;
	closeModal: () => void;
	setSession: (session: AuthSliceState["session"], user: AuthSliceState["user"]) => void;
};

export type AuthSlice = { auth: AuthSliceState & AuthSliceAction };
const defaultAuthState: AuthSliceState = {
	activeModal: undefined,
	session: undefined,
	user: undefined,
};
export const createAuthSlice: (init?: AuthSliceState) => StateCreator<AuthSlice> =
	(init) => (set, get, api) => ({
		auth: {
			...defaultAuthState,
			...init,
			showModal: (type) => {
				set((state) => ({
					auth: {
						...state.auth,
						activeModal: type,
					},
				}));
			},
			closeModal: () => {
				set((state) => ({
					auth: {
						...state.auth,
						activeModal: undefined,
					},
				}));
			},
			setSession: (session, user) => {
				set((state) => ({
					auth: {
						...state.auth,
						session,
						user,
						activeModal: undefined,
					},
				}));
			},
		},
	});
