"use server";
import { cookies, headers } from "next/headers";
import { getInjection } from "@/di";
import { parserCookie } from "@/utils/cookie";

export const signOut = async () => {
	const authModule = getInjection("authModule");
	const { setCookies, success } = await authModule.signOutUseCase({ headers: await headers() });
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
	return success;
};
