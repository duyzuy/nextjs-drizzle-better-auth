"use server";
import { getInjection } from "@/di";

export const signUp = async (input: {
	email: string;
	name: string;
	password: string;
	callbackURL?: string;
	image?: string;
}) => {
	const authModule = getInjection("authModule");
	const data = await authModule.signUpWithEmailUseCase({
		email: input.email,
		name: input.name,
		password: input.password,
		callbackURL: input.callbackURL ?? undefined,
		image: input.image ?? undefined,
	});
	return data;
};
