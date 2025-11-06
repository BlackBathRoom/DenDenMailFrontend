import { useEffect, useState, useSyncExternalStore } from 'react';

const DAISYUI_MODE_THEMES = {
  light: 'lemonade',
  dark: 'coffee',
};

const LOCAL_STORAGE_KEY = 'theme-storage';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = Exclude<Theme, 'system'>;

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return 'system';
};

const mapThemeToDaisyUI = (theme: ResolvedTheme): string =>
  DAISYUI_MODE_THEMES[theme];

type Return = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useTheme = (): Return => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());

  const systemTheme = useSyncExternalStore<ResolvedTheme>(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => onStoreChange();
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    },
    () => getSystemTheme(),
    () => 'light'
  );

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      mapThemeToDaisyUI(resolvedTheme)
    );
  }, [resolvedTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};
