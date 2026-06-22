import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
	...nextVitals,
	{
		plugins: { boundaries },
		settings: {
			"boundaries/debugEnabled": true,
			"boundaries/elements": [
				{ type: "app", pattern: ["src/app/**"], pathNot: ["src/app/_components/**"] },
				{
					// composed UI blocks
					type: "block-ui",
					pattern: ["src/widgets/**"],
				},
				{
					type: "feature", // ← singular, per-slice
					pattern: "src/features/(*)/**", // ← capture feature name
					capture: ["featureName"], // ← featureName = "auth", "user", etc.
				},
				{ type: "entities", pattern: ["src/entities/**"] },
				{ type: "infra-api", pattern: ["src/infrastructure/api/**"] },
				{ type: "infra-services", pattern: ["src/infrastructure/services/**"] },
				{
					type: "infra-repository",
					pattern: "src/infrastructure/repositories/(*)/**",
					capture: ["repoName"],
				},
				{
					type: "shared",
					pattern: ["src/lib/**", "src/utils/**", "src/components/**"],
				},
				{ type: "stores", pattern: ["src/stores/**"] },
			],
			"boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
		},
		rules: {
			"boundaries/element-types": [
				"error",
				{
					default: "disallow",
					rules: [
						{
							from: "app",
							allow: [
								"block-ui",
								"feature",
								"entities",
								"infra-api",
								"infra-services",
								"infra-repository",
								"shared",
								"stores",
							],
						},
						{
							from: "block-ui",
							allow: [
								"feature",
								"entities",
								"infrastructure",
								"infra-api",
								"infra-services",
								"infra-repository",
								"shared",
								"stores",
							],
						},
						{
							// each feature can only import from itself + lower layers
							from: [["feature", { featureName: "*" }]],
							allow: [
								"entities",
								"infrastructure",
								"shared",
								"stores",
								"infra-api",
								"infra-services",
								"infra-repository",
								// same feature only — auth can import auth, NOT user
								[["feature", { featureName: "${from.featureName}" }]],
							],
						},
						{
							from: "entities",
							allow: ["shared"],
						},
						{
							from: [["infra-repository", { repoName: "*" }]],
							allow: [
								"entities",
								"infra-api",
								"infra-services",
								"shared",
								[["infra-repository", { repoName: "${from.repoName}" }]],
							], // same-slice only
						},
						{ from: "infra-api", allow: ["shared"] },
						{ from: "infra-services", allow: ["shared"] },
						{
							from: "shared",
							allow: ["shared"],
						},
						{
							from: "stores",
							allow: ["feature"],
						},
					],
				},
			],
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
