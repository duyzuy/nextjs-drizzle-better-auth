import type { User } from "./user.model";

export interface IUserRepository {
	getOneById: (id: string) => Promise<User>;
	getOneByEmail: (email: string) => Promise<User>;
}
