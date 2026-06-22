import type { SignInWithEmailDto, SignUpWithEmailDto } from "@/entities/auth/model/auth";
import { DomainError } from "@/entities/errors/common";

export class AuthDomainRules {
	validateSignUp(input: SignUpWithEmailDto) {
		if (input.email.endsWith("@spam.com")) {
			throw new DomainError("Spam domain not allowed");
		}

		if (input.name.includes("admin")) {
			throw new DomainError("Invalid username");
		}

		return input;
	}

	validateSignIn(input: SignInWithEmailDto) {
		if (input.email.endsWith("@spam.com")) {
			throw new DomainError("Spam domain not allowed");
		}

		if (input.password.includes("admin")) {
			throw new DomainError("Invalid username");
		}

		return input;
	}
}
