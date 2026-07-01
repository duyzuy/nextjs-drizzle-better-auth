import { asc, count, eq, type InferSelectModel } from "drizzle-orm";
import type {
	GetUsersInput,
	GetUsersResult,
	UpdateUserInput,
	User,
} from "@/dal/domain/user/user.model";
import type { IUserRepository } from "@/dal/domain/user/user.repo";
import { db } from "@/db";
import { user } from "@/db/schema";
import { Pagination } from "../common/pagination";
export class UserRepository implements IUserRepository {
	constructor(private pagination = new Pagination(90, 20)) {}
	async getLists(input: GetUsersInput): Promise<GetUsersResult> {
		const { offset, limit, page } = this.pagination.createPaginate({
			page: input.page ?? 1,
			pageSize: input.pageSize ?? 20,
		});
		const [users, [totalItem]] = await Promise.all([
			db.select().from(user).orderBy(asc(user.createdAt)).limit(limit).offset(offset),
			db.select({ total: count() }).from(user),
		]);

		const totalPage = Math.ceil(totalItem.total / limit);
		return {
			page,
			pageSize: limit,
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
	async update(userInput: UpdateUserInput): Promise<User> {
		const [userData] = await db
			.update(user)
			.set({
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
