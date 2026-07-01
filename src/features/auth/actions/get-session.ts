import { headers } from "next/headers";
import { cache } from "react";
import { AuthenticationError } from "@/dal/domain/errors/auth";
import { getInjection } from "@/di";

export const getSession = cache(async () => {
	try {
		const authModule = getInjection("authModule");

		const data = await authModule.getSessionUseCase({ headers: await headers() });

		return {
			session: data.session,
			user: data.user,
		};
	} catch (error) {
		if (error instanceof AuthenticationError) {
			return null;
		}
		throw error;
		// console.log(error);
		//silent
	}
});
