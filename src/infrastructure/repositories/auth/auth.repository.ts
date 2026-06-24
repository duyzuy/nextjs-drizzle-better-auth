import { APIError } from "better-auth";
import { headers } from "next/headers";
import { InfrastructureError } from "@/dal/errors/common";
import type {
	AuthSession,
	AuthSignedIn,
	AuthSignedUp,
	SignInWithEmailDto,
	SignUpWithEmailDto,
	VerifyEmailDto,
} from "@/entities/auth/model/auth";
import type { IAuthRepository } from "@/entities/auth/model/auth.repo";
import { auth } from "@/lib/auth";

export class AuthRepository implements IAuthRepository {
	async signUpWithEmail(signUpDto: SignUpWithEmailDto): Promise<AuthSignedUp> {
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
			return {
				id: user.id,
				name: user.name,
				email: user.email,
			};
		} catch (error) {
			this.throwAuthError(error);
		}
	}

	async signInWithEmail(signInWithEmailDto: SignInWithEmailDto): Promise<AuthSignedIn> {
		try {
			const {
				headers: headerResponse,
				response: { user, token, url },
			} = await auth.api.signInEmail({
				body: {
					email: signInWithEmailDto.email,
					password: signInWithEmailDto.password,
					rememberMe: signInWithEmailDto.rememberMe,
					callbackURL: signInWithEmailDto.callbackUrl,
				},
				returnHeaders: true,
				headers: await headers(),
			});

			const setCookies = headerResponse.getSetCookie();

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				token,
				setCookies,
			};
		} catch (error) {
			this.throwAuthError(error);
		}
	}
	async signOut(): Promise<{ success: boolean; setCookies: string[] }> {
		try {
			const data = await auth.api.signOut({
				headers: await headers(),
				returnHeaders: true,
			});
			const setCookies = data.headers.getSetCookie();
			return { success: data.response.success, setCookies };
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

	async getSession(): Promise<AuthSession | null> {
		try {
			const data = await auth.api.getSession({
				headers: await headers(),
			});
			return data
				? {
						session: {
							id: data.session.id,
							token: data.session.token,
							expiresAt: data.session.expiresAt.toISOString(),
							createdAt: data.session.createdAt.toISOString(),
							ipAddress: data.session.ipAddress ?? undefined,
							updatedAt: data.session.updatedAt.toISOString(),
							userId: data.session.userId,
						},
						user: {
							id: data.user.id,
							email: data.user.email,
							name: data.user.name,
							image: data.user.image ?? undefined,
							emailVerified: data.user.emailVerified,
							createdAt: data.user.createdAt.toISOString(),
							updatedAt: data.user.updatedAt.toISOString(),
						},
					}
				: null;
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
