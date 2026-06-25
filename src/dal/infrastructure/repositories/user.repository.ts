import type { User } from "@/dal/domain/user/user.model";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { db } from "@/db";
export class UserRepository implements IUserRepository {
	async getOneById(id: string): Promise<User> {
		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, id),
		});
		if (!user) {
			throw new Error("Not found");
		}
		return {
			id: user?.id,
			email: user.email,
			emailVerified: user.emailVerified,
			image: user.image,
			name: user.name,
			updatedAt: user.updatedAt.toISOString(),
			createdAt: user.createdAt.toISOString(),
		};
	}
	async getOneByEmail(email: string): Promise<User> {
		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.email, email),
		});
		if (!user) {
			throw new Error("Not found");
		}
		return {
			id: user?.id,
			email: user.email,
			emailVerified: user.emailVerified,
			image: user.image,
			name: user.name,
			updatedAt: user.updatedAt.toISOString(),
			createdAt: user.createdAt.toISOString(),
		};
	}
}
