"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";
import { type AppStore, type AppStoreInit, createAppStore } from "./app.store";

export type CounterStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
	children: ReactNode;
	session?: AppStoreInit["session"];
	user?: AppStoreInit["user"];
}

export const AppStoreProvider = ({ children, session, user }: AppStoreProviderProps) => {
	const [store] = useState(() => createAppStore({ session, user }));

	// useEffect(() => {
	// 	store.getState().auth.setSession(session, user);
	// }, [session, user, store]);

	return <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
	const appContext = useContext(AppStoreContext);
	if (!appContext) {
		throw new Error(`useAppStore must be used within AppStoreProvider`);
	}

	return useStore(appContext, selector);
};
