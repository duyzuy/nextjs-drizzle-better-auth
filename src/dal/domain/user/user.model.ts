export interface User {
	id: string;
	createdAt: string;
	updatedAt: string;
	email: string;
	emailVerified: boolean;
	name: string;
	image: string | null;
}
