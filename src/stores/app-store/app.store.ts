import { createStore } from "zustand/vanilla";
import { type AuthSlice, createAuthSlice } from "@/features/auth/store/auth-store";
// import {
// 	createUserInformationSlice,
// 	type UserInformationSlice,
// } from "@/features/profile/store/user-information.slice";
import { createThemeSlice, type ThemeSlice } from "@/features/theme/store/theme.slice";

export type AppStore = AuthSlice & ThemeSlice;

export type AppStoreInit = {
	userInfo?: undefined;
	accessToken?: string;
	refreshToken?: string;
};

export const createAppStore = (init?: AppStoreInit) => {
	return createStore<AppStore>()((set, get, api) => ({
		...createAuthSlice({ accessToken: init?.accessToken, refreshToken: init?.refreshToken })(
			set,
			get,
			api,
		),
		...createThemeSlice()(set, get, api),
		// ...createUserInformationSlice({ information: init?.userInfo })(set, get, api),
	}));
};
