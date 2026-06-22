import type { auth } from "@/lib/auth";

export type BetterAuthSignupDto = Awaited<ReturnType<typeof auth.api.signUpEmail>>;

export type BetterAuthSigninDto = Awaited<ReturnType<typeof auth.api.signInEmail>>;
