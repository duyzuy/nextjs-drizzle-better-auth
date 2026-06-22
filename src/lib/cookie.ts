import { cookies } from "next/headers";

export async function getServerAuthHeaders() {
	const cookieStore = await cookies();

	const token = cookieStore.get("access_token")?.value;

	return token
		? {
				Authorization: `Bearer ${token}`,
			}
		: {};
}

export async function getAccessToken() {
	const cookieStore = await cookies();
	return cookieStore.get("access_token")?.value;
}

export async function getRefreshToken() {
	const cookieStore = await cookies();
	return cookieStore.get("refresh_token")?.value;
}
