"use client";
import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";

const AuthenticationDispatchStore = ({
	user,
	session,
}: {
	user?: { id: string; name: string; email: string; avatar?: string; emailVerified: boolean };
	session?: {
		id: string;
		ipAddress?: string;
		token: string;
		userAgent?: string;
		userId: string;
		expiredAt: string;
	};
}) => {
	const setSession = useAppStore((state) => state.auth.setSession);

	useEffect(() => {
		setSession(session, user);
	}, [session, user, setSession]);
	return null;
};

export default AuthenticationDispatchStore;
