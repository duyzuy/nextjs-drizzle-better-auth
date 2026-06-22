import { AuthRepository } from "@/infrastructure/repositories/auth/auth.repository";
import { AuthService } from "../services/auth.service";

export const authService = new AuthService(new AuthRepository());
