"use client";
import type React from "react";
import { useAuth } from "../hooks/useAuth";

function UnAuthorized(props: { children: React.ReactNode }) {
	const auth = useAuth();

	if (auth.isLoggedIn) {
		return null;
	}
	return props.children;
}

export default UnAuthorized;
