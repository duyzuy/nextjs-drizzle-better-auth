import type { PaginationResult } from "../base/pagination.interface";

export interface User {
	id: string;
	createdAt: string;
	updatedAt: string;
	email: string;
	emailVerified: boolean;
	name: string;
	image: string | null;
}

export interface UserUpdateInput extends Pick<User, "image" | "name" | "updatedAt" | "id"> {}

export interface GetUsersInput {
	page?: number;
	pageSize?: number;
	q?: string;
}

export interface GetUsersResult extends PaginationResult<User> {}
