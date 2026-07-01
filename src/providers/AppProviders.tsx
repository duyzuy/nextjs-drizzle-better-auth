"use server";
import { Suspense } from "react";
import AuthenticationController from "@/features/auth/components/AuthenticationController";
import ThemeController from "@/features/theme/controllers/ThemeController";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { AppStoreProvider } from "@/stores/app-store/AppStoreProvider";
export async function AppProviders({ children }: React.PropsWithChildren) {
	return (
		<AppStoreProvider>
			<ThemeController />
			<Suspense fallback={null}>
				<AuthenticationController />
			</Suspense>
			<QueryClientProvider>{children}</QueryClientProvider>
		</AppStoreProvider>
	);
}
