import { useAppStore } from "@/stores/app-store/AppStoreProvider";

export default function useTheme() {
	const themeMode = useAppStore((state) => state.theme.themeMode);
	const setThemeMode = useAppStore((state) => state.theme.setThemeMode);

	return { themeMode, setThemeMode };
}
