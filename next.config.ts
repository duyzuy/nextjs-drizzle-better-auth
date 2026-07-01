import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	logging: {
		fetches: { fullUrl: true },
	},
	experimental: {
		viewTransition: true,
		cacheComponents: true,
	},
};

export default nextConfig;
