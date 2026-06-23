import z from "zod";

export const SignUpWithEmailSchema = z
	.object({
		name: z.string().min(3),
		email: z.email(),
		password: z.string().min(8),
		passwordConfirm: z.string().min(8),
		image: z.string().optional().nullable(),
		callbackURL: z.string().optional().nullable(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Passwords do not match",
	});

export const SignInWithEmailSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});
