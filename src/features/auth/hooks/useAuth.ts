import { useAppStore } from "@/stores/app-store/AppStoreProvider";

export const useAuth = () => {
	const token = useAppStore((store) => store.auth.accessToken);
	return {
		isLoggedIn: Boolean(token),
		token,
	};
};
