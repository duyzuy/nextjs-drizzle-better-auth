import { AuthRepository } from "../../infrastructure/repositories/auth/auth.repository";
import { AuthDomainRules } from "../services/auth/auth.policy";
import { AuthService } from "../services/auth/auth.service";

export const authService = new AuthService(new AuthRepository(), new AuthDomainRules());
