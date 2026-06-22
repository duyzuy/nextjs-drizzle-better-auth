"use client";
import { QueryClientProvider as QueryProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import getQueryClient from "../lib/tanstack-query/getQueryClient";

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<QueryProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryProvider>
	);
}
