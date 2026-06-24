import { AuthRepository } from "@/infrastructure/repositories/auth/auth.repository";
import { AuthDomainRules } from "./auth.policy";
import { AuthService } from "./auth.service";

export const authService = new AuthService(new AuthRepository(), new AuthDomainRules());
