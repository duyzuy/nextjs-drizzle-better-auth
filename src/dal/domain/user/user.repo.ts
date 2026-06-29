import type { GetUsersInput, GetUsersResult, User, UserUpdateInput } from "./user.model";

export interface IUserRepository {
	getOneById(id: string): Promise<User>;
	getOneByEmail(email: string): Promise<User>;
	getLists(input?: GetUsersInput): Promise<GetUsersResult>;
	update(user: UserUpdateInput): Promise<User>;
}
