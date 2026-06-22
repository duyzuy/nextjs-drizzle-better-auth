import type { StateCreator } from "zustand";

type ThemeMode = "dark" | "light" | "system";

export type ThemeSliceState = {
	themeMode: ThemeMode;
};
export type ThemeSliceAction = {
	setThemeMode: (theme: ThemeMode) => void;
};

export type ThemeSlice = { theme: ThemeSliceState & ThemeSliceAction };

const defaultState: ThemeSliceState = {
	themeMode: "system",
};

export const createThemeSlice: (init?: ThemeSliceState) => StateCreator<ThemeSlice> =
	(init) => (set, get, api) => ({
		theme: {
			...defaultState,
			...init,
			setThemeMode: (theme: ThemeMode) => {
				set((state) => ({
					...state,
					theme: {
						...state.theme,
						themeMode: theme,
					},
				}));
			},
			...init,
		},
	});
