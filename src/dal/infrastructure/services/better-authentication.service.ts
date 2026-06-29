import { APIError } from "better-auth";
import { headers } from "next/headers";
import type { IAuthenticationService } from "@/dal/application/services/authentication.service.interface";
import type {
	AuthSessionResult,
	AuthSignedInResult,
	AuthSignedUpResult,
	RequestResetPasswordInput,
	RequestResetPasswordResult,
	ResetPasswordInput,
	ResetPasswordResult,
	SignInWithEmailInput,
	SignUpWithEmailInput,
	VerifyEmailInput,
} from "@/dal/domain/auth/auth.model";
import { AuthenticationError } from "@/dal/domain/errors/auth";
import { ExternalApiError } from "@/dal/domain/errors/common";
import { auth } from "@/lib/auth";

export class BetterAuthenticationService implements IAuthenticationService {
	async signUpWithEmail(input: SignUpWithEmailInput): Promise<AuthSignedUpResult> {
		try {
			const { user } = await auth.api.signUpEmail({
				body: {
					name: input.name,
					email: input.email,
					password: input.password,
					image: input.image ?? undefined,
					callbackURL: input.callbackURL ?? undefined,
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

	async signInWithEmail(input: SignInWithEmailInput): Promise<AuthSignedInResult> {
		try {
			const {
				headers: headerResponse,
				response: { user, token, url },
			} = await auth.api.signInEmail({
				body: {
					email: input.email,
					password: input.password,
					rememberMe: input.rememberMe,
					callbackURL: input.callbackUrl,
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
	async signOut({
		headers,
	}: {
		headers: Headers;
	}): Promise<{ success: boolean; setCookies: string[] }> {
		try {
			const data = await auth.api.signOut({
				headers,
				returnHeaders: true,
			});
			const setCookies = data.headers.getSetCookie();
			return { success: data.response.success, setCookies };
		} catch (error) {
			this.throwAuthError(error);
		}
	}
	async sendVerificationEmail(input: VerifyEmailInput) {
		try {
			const data = await auth.api.sendVerificationEmail({
				body: {
					email: input.email,
					callbackURL: input.callBackURL,
				},
			});
			return data.status;
		} catch (error) {
			this.throwAuthError(error);
		}
	}

	async getSession({ headers }: { headers: Headers }): Promise<AuthSessionResult | null> {
		try {
			const data = await auth.api.getSession({
				headers,
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

	async requestResetPassword(
		input: RequestResetPasswordInput,
	): Promise<RequestResetPasswordResult> {
		try {
			const data = await auth.api.requestPasswordReset({
				body: {
					email: input.email,
					redirectTo: input.redirectTo,
				},
			});
			return data;
		} catch (error) {
			this.throwAuthError(error);
		}
	}

	async resetPassword(input: ResetPasswordInput): Promise<ResetPasswordResult> {
		try {
			const data = await auth.api.resetPassword({
				body: {
					newPassword: input.newPassword,
					token: input.token,
				},
			});
			return data;
		} catch (error) {
			this.throwAuthError(error);
		}
	}
	private throwAuthError(error: unknown): never {
		if (error instanceof APIError) {
			throw new AuthenticationError(error.message, error.statusCode, error); //TODO: mapping error entities
		}
		const errorMessage = error instanceof Error ? error.message : "Unexpected error!"; //TODO: mapping error entities
		throw new ExternalApiError(errorMessage, { cause: error });
	}
}

export const betterAuthService = new BetterAuthenticationService();
