import { APIError } from "better-auth";
import { headers } from "next/headers";
import { InfrastructureError } from "@/dal/errors/common";
import type {
	SignInWithEmailDto,
	SignUpWithEmailDto,
	VerifyEmailDto,
} from "@/entities/auth/model/auth";
import type { IAuthRepository } from "@/entities/auth/model/auth.repo";
import { AuthUser } from "@/entities/auth/model/auth-user";
import { auth } from "@/lib/auth";

export class AuthRepository implements IAuthRepository {
	async signUpWithEmail(signUpDto: SignUpWithEmailDto): Promise<AuthUser> {
		try {
			const { user } = await auth.api.signUpEmail({
				body: {
					name: signUpDto.name,
					email: signUpDto.email,
					password: signUpDto.password,
					image: signUpDto.image ?? undefined,
					callbackURL: signUpDto.callbackURL ?? undefined,
				},
			});
			return AuthUser.create({
				id: user.id,
				email: user.email,
				name: user.name,
			});
		} catch (error) {
			this.throwAuthError(error);
		}
	}

	async signInWithEmail(signInWithEmailDto: SignInWithEmailDto): Promise<AuthUser> {
		try {
			const { user } = await auth.api.signInEmail({
				body: {
					email: signInWithEmailDto.email,
					password: signInWithEmailDto.password,
					rememberMe: signInWithEmailDto.rememberMe,
				},
			});
			return AuthUser.create({
				id: user.id,
				email: user.email,
				name: user.name,
			});
		} catch (error) {
			this.throwAuthError(error);
		}
	}
	async signOut() {
		try {
			const signout = await auth.api.signOut({
				headers: await headers(),
			});
			return signout.success;
		} catch (error) {
			this.throwAuthError(error);
		}
	}
	async verifyEmail(dto: VerifyEmailDto) {
		try {
			const data = await auth.api.sendVerificationEmail({
				body: {
					email: dto.email,
					callbackURL: dto.callBackURL,
				},
			});
			return data.status;
		} catch (error) {
			this.throwAuthError(error);
		}
	}

	private throwAuthError(error: unknown): never {
		if (error instanceof APIError) {
			throw new InfrastructureError(error.message, error);
		}
		throw new InfrastructureError("Unknown error", error);
	}
}
