import { createStore } from "zustand/vanilla";
import {
	type AuthSlice,
	type AuthSliceState,
	createAuthSlice,
} from "@/features/auth/store/auth-store";
import { createThemeSlice, type ThemeSlice } from "@/features/theme/store/theme.slice";

export type AppStore = AuthSlice & ThemeSlice;

export type AppStoreInit = {
	user?: AuthSliceState["user"];
	session?: AuthSliceState["session"];
};

export const createAppStore = ({ user, session }: AppStoreInit) => {
	return createStore<AppStore>()((set, get, api) => ({
		...createAuthSlice({ session, user })(set, get, api),
		...createThemeSlice()(set, get, api),
	}));
};
