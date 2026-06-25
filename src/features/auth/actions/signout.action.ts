"use server";
import { APIError } from "better-auth";
import { cookies } from "next/headers";
import { appContainer, getInjection } from "@/dal/container";
import { actionClient } from "@/lib/safe-action";
import { parserCookie } from "@/utils/cookie";

type SignOutSuccessReturn = {
	status: "success";
};

type SignOutErrorReturn = { status: "error"; message: string };
type SignoutReturn = SignOutSuccessReturn | SignOutErrorReturn;

export const signoutSafeAction = actionClient
	.use(async ({ next }) => {
		return next();
	})
	.action(async (): Promise<SignoutReturn> => {
		try {
			const authService = getInjection("authService");

			const { setCookies, success } = await authService.signOut();
			const cookieStore = await cookies();

			for (const cookie of setCookies) {
				const cookieParsed = parserCookie(cookie);
				cookieStore.set({
					name: cookieParsed.name,
					value: decodeURIComponent(cookieParsed.value),
					secure: true,
					path: cookieParsed.path,
					httpOnly: cookieParsed.httpOnly,
					maxAge: cookieParsed.maxAge,
					sameSite: cookieParsed.sameSite,
				});
			}
			return {
				status: "success",
			};
		} catch (err) {
			if (err instanceof APIError) {
				return { status: "error", message: err.message };
			}
			const errorMessage = err instanceof Error ? err.message : "unknown error";
			return { status: "error", message: errorMessage };
		}
	});
