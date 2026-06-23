"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";
import { type AppStore, type AppStoreInit, createAppStore } from "./app.store";

export type CounterStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
	children: ReactNode;
	userInfo?: AppStoreInit["userInfo"];
	accessToken?: string;
	refreshToken?: string;
}

export const AppStoreProvider = ({
	children,
	userInfo,
	accessToken,
	refreshToken,
}: AppStoreProviderProps) => {
	const [store] = useState(() => createAppStore({ accessToken, refreshToken }));

	useEffect(() => {
		store.getState().auth.setTokens(accessToken, refreshToken);
		// store.getState().userInformation.setInformation(userInfo);
	}, [accessToken, refreshToken, store]);

	return <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
	const appContext = useContext(AppStoreContext);
	if (!appContext) {
		throw new Error(`useAppStore must be used within AppStoreProvider`);
	}

	return useStore(appContext, selector);
};
