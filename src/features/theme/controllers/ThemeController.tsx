"use client";
import React, { useEffect } from "react";
import useTheme from "@/features/theme/hooks/useTheme";
import type { ThemeSliceState } from "@/features/theme/store/theme.slice";

const themeModeOptions: ThemeSliceState["themeMode"][] = ["dark", "light", "system"];

export function getResolvedTheme(mode: ThemeSliceState["themeMode"]): "light" | "dark" {
	if (mode !== "system") {
		return mode;
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: "light" | "dark") {
	document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeController() {
	const { themeMode, setThemeMode } = useTheme();

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme && themeModeOptions.includes(savedTheme as ThemeSliceState["themeMode"])) {
			setThemeMode(savedTheme as ThemeSliceState["themeMode"]);
		}
	}, [setThemeMode]);

	useEffect(() => {
		localStorage.setItem("theme", themeMode);
		applyTheme(getResolvedTheme(themeMode));
	}, [themeMode]);

	return null;
}
