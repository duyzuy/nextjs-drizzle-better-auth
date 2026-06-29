import { headers } from "next/headers";
import { getInjection } from "@/di";
import { actionClient } from "@/lib/safe-action";

export const getSession = actionClient.action(async () => {
	try {
		const getSession = getInjection("getSessionUseCase");
		const data = await getSession({ headers: await headers() });
		return {
			session: data.session,
			user: data.user,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
});
