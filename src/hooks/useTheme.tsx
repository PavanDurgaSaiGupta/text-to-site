import { useState, useEffect } from 'react';

export type ThemeName = 'retro' | 'cyber' | 'midnight' | 'clean';

interface Theme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
  border: string;
}

const themes: Record<ThemeName, Theme> = {
  retro: {
    name: 'Retro Paper',
    bg: '#f4f1ea',
    text: '#000000',
    accent: '#ff3333',
    secondary: '#ffcc00',
    border: '#000000',
  },
  cyber: {
    name: 'Cyber Grunge',
    bg: '#050505',
    text: '#ffffff',
    accent: '#00ff41',
    secondary: '#f600ff',
    border: '#ffffff',
  },
  midnight: {
    name: 'Midnight Pro',
    bg: '#020617',
    text: '#f8fafc',
    accent: '#38bdf8',
    secondary: '#6366f1',
    border: '#1e293b',
  },
  clean: {
    name: 'Clean Slate',
    bg: '#ffffff',
    text: '#000000',
    accent: '#000000',
    secondary: '#e5e5e5',
    border: '#000000',
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

    // Convert hex to HSL
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

    root.style.setProperty('--background', hexToHSL(theme.bg));
    root.style.setProperty('--foreground', hexToHSL(theme.text));
    root.style.setProperty('--accent', hexToHSL(theme.accent));
    root.style.setProperty('--secondary', hexToHSL(theme.secondary));
    root.style.setProperty('--border', hexToHSL(theme.border));
    root.style.setProperty('--primary', hexToHSL(theme.text));
    root.style.setProperty('--primary-foreground', hexToHSL(theme.bg));

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
