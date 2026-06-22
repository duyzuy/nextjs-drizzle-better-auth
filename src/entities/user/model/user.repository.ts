import type { DalReturn } from "@/infrastructure/db/types";
import type { CreateUserDto, CreateUserReturn, User } from "./user.model";

export interface IUserRepository {
	create(dto: CreateUserDto): Promise<DalReturn<CreateUserReturn>>;
}
