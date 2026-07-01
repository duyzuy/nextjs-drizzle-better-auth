"use server";
import { cookies } from "next/headers";
import { getInjection } from "@/di";
import { parserCookie } from "@/utils/cookie";

export const signIn = async (input: { email: string; password: string }) => {
	const signInWithEmailUseCase = getInjection("signInWithEmailUseCase");
	const data = await signInWithEmailUseCase({
		email: input.email,
		password: input.password,
		rememberMe: true,
	});

	const cookieStore = await cookies();

	const setCookies = data.setCookies;

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
	return data;
};
