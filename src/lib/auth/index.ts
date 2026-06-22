import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		requireEmailVerification: false,
		enabled: true,
	},
	experimental: { joins: true },
	// emailVerification: {
	// 	sendVerificationEmail: async ({ user, url, token }, request) => {
	// 		void sendEmail({
	// 			to: user.email,
	// 			subject: "Verify your email address",
	// 			text: `Click the link to verify your email: ${url}`,
	// 		});
	// 	},
	// },
});

// function sendEmail(params: { to: string; subject: string; text: string }) {
// 	// add Resend to test
// }
