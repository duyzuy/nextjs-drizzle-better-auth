export const themeInitScript = `
(function() {
  try {
  	
	const themeOptions  = ['dark', 'light', 'system'];
	const savedTheme = localStorage.getItem('theme');

    const theme = (savedTheme && themeOptions.includes(savedTheme)) ? savedTheme : 'system';
	
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const resolvedTheme = theme === 'system' ? systemTheme : theme;
	
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  } catch {}
})();
`;
