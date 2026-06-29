"use server";
import { cookies } from "next/headers";
import { AuthenticationError } from "@/dal/domain/errors/auth";
import { getInjection } from "@/di";
import { actionClient } from "@/lib/safe-action";
import { parserCookie } from "@/utils/cookie";
import { SignInWithEmailSchema } from "./auth.schema";

type SignInSuccessReturn = {
	status: "success";
	data: { id: string; email: string; name: string };
};

type SignInErrorReturn = { status: "error"; message: string };
type SignUpReturn = SignInSuccessReturn | SignInErrorReturn;

export const signInAction = actionClient
	.inputSchema(SignInWithEmailSchema)
	.action(async ({ parsedInput }): Promise<SignUpReturn> => {
		try {
			const signInWithEmailUseCase = getInjection("signInWithEmailUseCase");
			const data = await signInWithEmailUseCase({
				email: parsedInput.email,
				password: parsedInput.password,
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
			return {
				status: "success",
				data: { id: data.id, email: data.name, name: data.name },
			};
		} catch (error) {
			console.log(error);
			if (error instanceof AuthenticationError) {
				return { status: "error", message: error.message };
			}
			const errorMessage = error instanceof Error ? error.message : "unknown error";
			return { status: "error", message: errorMessage };
		}
	});
