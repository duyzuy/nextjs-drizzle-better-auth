import type { SignInReturn, SignUpReturn } from "@/entities/auth/model/auth";
import type { BetterAuthSigninDto, BetterAuthSignupDto } from "./auth.dto";

export const toSigninDomain = (dto: BetterAuthSigninDto): SignInReturn => {
	return {
		token: dto.token,
		redirectUrl: dto.url,
		redirect: dto.redirect,
	};
};

export const toSignUpDomain = (dto: BetterAuthSignupDto): SignUpReturn => {
	return {
		id: dto.user.id,
		name: dto.user.name,
		email: dto.user.email,
		image: dto.user.image,
		token: dto.token,
	};
};
