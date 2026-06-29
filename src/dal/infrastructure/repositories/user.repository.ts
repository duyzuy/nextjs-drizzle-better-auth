import { asc, count, eq, type InferSelectModel } from "drizzle-orm";
import type {
	GetUsersInput,
	GetUsersResult,
	User,
	UserUpdateInput,
} from "@/dal/domain/user/user.model";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { db } from "@/db";
import { user } from "@/db/schema";
export class UserRepository implements IUserRepository {
	private page = 1;
	private pageSize = 20;
	async getLists(input: GetUsersInput): Promise<GetUsersResult> {
		const page = input?.page && input?.page > 0 ? input?.page : this.page;
		const pageSize = input?.pageSize ?? this.pageSize;

		const [users, [totalItem]] = await Promise.all([
			await db
				.select()
				.from(user)
				.orderBy(asc(user.createdAt))
				.limit(pageSize)
				.offset((page - 1) * pageSize),
			await db.select({ total: count() }).from(user),
		]);

		const totalPage = Math.ceil(totalItem.total / pageSize);
		return {
			page,
			pageSize,
			totalItem: totalItem.total,
			totalPage,
			items: users.map((user) => this.toUserModel(user)),
		};
	}

	async getOneById(id: string): Promise<User> {
		const userData = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, id),
		});
		if (!userData) {
			throw new Error("Not found");
		}
		return this.toUserModel(userData);
	}
	async getOneByEmail(email: string): Promise<User> {
		const userData = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.email, email),
		});
		if (!userData) {
			throw new Error("Not found");
		}
		return this.toUserModel(userData);
	}
	async update(userInput: UserUpdateInput): Promise<User> {
		const [userData] = await db
			.update(user)
			.set({
				email: userInput.name,
				image: userInput.image,
				name: userInput.name,
			})
			.where(eq(user.id, userInput.id))
			.returning();

		if (!userData) {
			throw new Error("Not found");
		}

		return this.toUserModel(userData);
	}

	private toUserModel(data: InferSelectModel<typeof user>): User {
		return {
			id: data.id,
			email: data.email,
			emailVerified: data.emailVerified,
			image: data.image,
			name: data.name,
			updatedAt: data.updatedAt.toISOString(),
			createdAt: data.createdAt.toISOString(),
		};
	}
}

export const userRepository = new UserRepository();
