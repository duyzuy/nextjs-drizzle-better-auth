export function parserCookie(cookie: string) {
	const parts = cookie.split(";").map((p) => p.trim());

	const [nameValue, ...attrs] = parts;

	const firstEqual = nameValue.indexOf("=");

	const name = nameValue.slice(0, firstEqual);
	const value = nameValue.slice(firstEqual + 1);

	const maxAge = attrs.find((a) => a.startsWith("Max-Age="))?.replace("Max-Age=", "");

	const sameSite = attrs.find((a) => a.startsWith("SameSite="))?.replace("SameSite=", "") as
		| "lax"
		| "none"
		| "strict";
	return {
		name,
		value,
		maxAge: maxAge ? Number(maxAge) : undefined,
		httpOnly: attrs.includes("HttpOnly"),
		secure: attrs.includes("Secure"),
		path: attrs.find((a) => a.startsWith("Path="))?.replace("Path=", ""),
		sameSite,
	};
}
