"use client";
import type React from "react";
import { Button } from "@/components/base/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import useTheme from "../hooks/useTheme";
import type { ThemeSliceState } from "../store/theme.slice";

interface ThemeModeButtonProps {
	className?: string;
}
const ThemeModeButton: React.FC<ThemeModeButtonProps> = () => {
	const { themeMode, setThemeMode } = useTheme();

	const changeThemeMode = (mode: ThemeSliceState["themeMode"]) => () => {
		setThemeMode(mode);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>theme-mode-icon</title>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
						<path d="M12 3l0 18"></path>
						<path d="M12 9l4.65 -4.65"></path>
						<path d="M12 14.3l7.37 -7.37"></path>
						<path d="M12 19.6l8.85 -8.85"></path>
					</svg>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={changeThemeMode("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={changeThemeMode("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={changeThemeMode("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeModeButton;
