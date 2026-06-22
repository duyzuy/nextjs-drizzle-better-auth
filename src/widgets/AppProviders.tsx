// import { getProfile } from "@/features/profile/server";
import ThemeController from "@/features/theme/controllers/ThemeController";
import { getAccessToken, getRefreshToken } from "@/lib/cookie";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { AppStoreProvider } from "@/stores/app-store/AppStoreProvider";

export async function AppProviders({ children }: React.PropsWithChildren) {
	const [accessToken, refreshToken] = await Promise.all([getAccessToken(), getRefreshToken()]);

	// const userProfile = accessToken ? await getProfile(accessToken) : null;
	// const userProfile = null;
	// const userInfoStore = userProfile
	// 	? {
	// 			id: userProfile.id,
	// 			email: userProfile?.email,
	// 			name: userProfile.name,
	// 			username: userProfile.username,
	// 		}
	// 	: undefined;

	return (
		<AppStoreProvider
			accessToken={accessToken}
			refreshToken={refreshToken}
			userInfo={undefined}
		>
			<ThemeController />
			<QueryClientProvider>{children}</QueryClientProvider>
		</AppStoreProvider>
	);
}
