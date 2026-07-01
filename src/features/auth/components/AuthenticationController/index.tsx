"use server";

import { getSession } from "../../actions/get-session";
import AuthenticationDispatchStore from "./AuthenticationDispatchStore";

const AuthenticationController = async () => {
	const data = await getSession();
	const userInfoStore = data
		? {
				id: data.user.id,
				name: data.user.name,
				email: data.user.email,
				avatar: data.user.image,
				emailVerified: data.user.emailVerified,
			}
		: undefined;

	const sessionStore = data
		? {
				id: data.session.id,
				ipAddress: data.session.ipAddress ?? undefined,
				token: data.session.token,
				userAgent: data.session.userAgent,
				userId: data.session.userId,
				expiredAt: data.session.expiresAt,
			}
		: undefined;

	return <AuthenticationDispatchStore session={sessionStore} user={userInfoStore} />;
};
export default AuthenticationController;
