import type { StateCreator } from "zustand";

type AuthModalType = "signin" | "signup" | "forgot-password" | "verify-email";

export type AuthSliceState = {
	activeModal?: AuthModalType;
	token?: string;
	accessToken?: string;
	refreshToken?: string;
};
export type AuthSliceAction = {
	showModal: (type: AuthModalType) => void;
	closeModal: () => void;
	setTokens: (accessToken: string | undefined, refreshToken: string | undefined) => void;
};

export type AuthSlice = { auth: AuthSliceState & AuthSliceAction };
const defaultAuthState: AuthSliceState = {
	activeModal: undefined,
	accessToken: undefined,
	refreshToken: undefined,
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
			setTokens: (accessToken, refreshToken) => {
				set((state) => ({
					auth: {
						...state.auth,
						accessToken,
						refreshToken,
						activeModal: undefined,
					},
				}));
			},
		},
	});
