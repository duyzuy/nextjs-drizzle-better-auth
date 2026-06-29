"use server";
import { getSession } from "@/features/auth/actions/get-session";
import ThemeController from "@/features/theme/controllers/ThemeController";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { AppStoreProvider } from "@/stores/app-store/AppStoreProvider";
export async function AppProviders({ children }: React.PropsWithChildren) {
	const { data } = await getSession();
	const userInfoStore = data
		? {
				id: data.user.id,
				name: data.user.name,
				email: data.user.email,
				avatar: data.user.image,
				emailVerified: data.user.emailVerified,
			}
		: undefined;

	const sessionStore = data
		? {
				id: data.session.id,
				ipAddress: data.session.ipAddress ?? undefined,
				token: data.session.token,
				userAgent: data.session.userAgent,
				userId: data.session.userId,
				expiredAt: data.session.expiresAt,
			}
		: undefined;

	return (
		<AppStoreProvider session={sessionStore} user={userInfoStore}>
			<ThemeController />
			<QueryClientProvider>{children}</QueryClientProvider>
		</AppStoreProvider>
	);
}
