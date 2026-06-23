import { AuthRepository } from "../../infrastructure/repositories/auth/auth.repository";
import { AuthDomainRules } from "../services/auth.policy";
import { AuthService } from "../services/auth.service";

export const authService = new AuthService(new AuthRepository(), new AuthDomainRules());
