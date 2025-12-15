import { useState, useEffect } from 'react';

export type ThemeName = 'retro' | 'cyber' | 'midnight' | 'clean';

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

interface Theme extends ThemeColors {
  name: string;
}

const themes: Record<ThemeName, Theme> = {
  retro: {
    name: 'Retro Paper',
    background: '#f4f1ea',
    foreground: '#2c2c2c',
    card: '#ffffff',
    cardForeground: '#2c2c2c',
    popover: '#ffffff',
    popoverForeground: '#2c2c2c',
    primary: '#ff3333',
    primaryForeground: '#ffffff',
    secondary: '#ffcc00',
    secondaryForeground: '#2c2c2c',
    muted: '#e6e2d8',
    mutedForeground: '#78716c',
    accent: '#ff9900',
    accentForeground: '#2c2c2c',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#2c2c2c',
    input: '#e6e2d8',
    ring: '#ff3333',
  },
  cyber: {
    name: 'Cyber Grunge',
    background: '#050505',
    foreground: '#e0e0e0',
    card: '#121212',
    cardForeground: '#e0e0e0',
    popover: '#121212',
    popoverForeground: '#e0e0e0',
    primary: '#00ff41',
    primaryForeground: '#000000',
    secondary: '#f600ff',
    secondaryForeground: '#ffffff',
    muted: '#1a1a1a',
    mutedForeground: '#a3a3a3',
    accent: '#00ff41',
    accentForeground: '#000000',
    destructive: '#ff003c',
    destructiveForeground: '#ffffff',
    border: '#333333',
    input: '#1a1a1a',
    ring: '#00ff41',
  },
  midnight: {
    name: 'Midnight Pro',
    background: '#020617',
    foreground: '#f8fafc',
    card: '#0f172a',
    cardForeground: '#f8fafc',
    popover: '#0f172a',
    popoverForeground: '#f8fafc',
    primary: '#38bdf8',
    primaryForeground: '#0f172a',
    secondary: '#6366f1',
    secondaryForeground: '#ffffff',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    accent: '#0ea5e9',
    accentForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#1e293b',
    input: '#1e293b',
    ring: '#38bdf8',
  },
  clean: {
    name: 'Clean Slate',
    background: '#ffffff',
    foreground: '#09090b',
    card: '#ffffff',
    cardForeground: '#09090b',
    popover: '#ffffff',
    popoverForeground: '#09090b',
    primary: '#18181b',
    primaryForeground: '#fafafa',
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    accent: '#f4f4f5',
    accentForeground: '#18181b',
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#18181b',
  },
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('retro');

  useEffect(() => {
    const savedTheme = localStorage.getItem('fitnimbus-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    const hexToHSL = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '0 0% 0%';

      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    const setProperty = (key: string, value: string) => {
      root.style.setProperty(`--${key}`, hexToHSL(value));
    };

    // Apply all theme colors
    setProperty('background', theme.background);
    setProperty('foreground', theme.foreground);
    setProperty('card', theme.card);
    setProperty('card-foreground', theme.cardForeground);
    setProperty('popover', theme.popover);
    setProperty('popover-foreground', theme.popoverForeground);
    setProperty('primary', theme.primary);
    setProperty('primary-foreground', theme.primaryForeground);
    setProperty('secondary', theme.secondary);
    setProperty('secondary-foreground', theme.secondaryForeground);
    setProperty('muted', theme.muted);
    setProperty('muted-foreground', theme.mutedForeground);
    setProperty('accent', theme.accent);
    setProperty('accent-foreground', theme.accentForeground);
    setProperty('destructive', theme.destructive);
    setProperty('destructive-foreground', theme.destructiveForeground);
    setProperty('border', theme.border);
    setProperty('input', theme.input);
    setProperty('ring', theme.ring);

    localStorage.setItem('fitnimbus-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes) as ThemeName[];
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  return {
    currentTheme,
    theme: themes[currentTheme],
    toggleTheme,
    setTheme: setCurrentTheme,
  };
};
