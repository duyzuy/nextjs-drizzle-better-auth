"use server";
import { headers } from "next/headers";
import { getInjection } from "@/dal/container";
import ThemeController from "@/features/theme/controllers/ThemeController";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { AppStoreProvider } from "@/stores/app-store/AppStoreProvider";
export async function AppProviders({ children }: React.PropsWithChildren) {
	const authService = getInjection("authService");
	const { session, user } = (await authService.getSession({ headers: await headers() })) || {};
	const userInfoStore = user
		? {
				id: user.id,
				name: user.name,
				email: user.email,
				avatar: user.image,
				emailVerified: user.emailVerified,
			}
		: undefined;

	const sessionStore = session
		? {
				id: session.id,
				ipAddress: session.ipAddress ?? undefined,
				token: session.token,
				userAgent: session.userAgent,
				userId: session.userId,
				expiredAt: session.expiresAt,
			}
		: undefined;

	return (
		<AppStoreProvider session={sessionStore} user={userInfoStore}>
			<ThemeController />
			<QueryClientProvider>{children}</QueryClientProvider>
		</AppStoreProvider>
	);
}
