import { useAppStore } from "@/stores/app-store/AppStoreProvider";

export const useAuth = () => {
	const session = useAppStore((store) => store.auth.session);
	const user = useAppStore((store) => store.auth.user);

	if (!session) {
		return {
			isLoggedIn: false,
			session: undefined,
			user: undefined,
		};
	}
	return {
		isLoggedIn: true,
		session,
		user,
	};
};
