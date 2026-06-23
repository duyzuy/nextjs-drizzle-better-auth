import { createSafeActionClient } from "next-safe-action";
export const actionClient = createSafeActionClient();
export const authClient = actionClient.use(({ next }) => {
	/**
	 * get session to handle auth
	 */
	return next();
});

// export const adminAction = authClient
