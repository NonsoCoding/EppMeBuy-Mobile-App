import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    buttonBackground: '#5265FF',
    buttonText: '#fff',
        border: '#5265FF',
    lighterBackground: "#fff",
    lighterBg: "#5265FF1A",
      cardColor: "#fff"
  },
  dark: {
    text: '#fff',
    background: '#0D0E22',
      tint: tintColorDark,
    lighterBackground: "#1C2039",
    cardColor: "#1C2039",
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    buttonBackground: '#7685FF',
    buttonText: '#fff',
    border: '#7685FF',
    lighterBg: "#5265FF1A"
  },
};

export type ThemeMode = 'light' | 'dark' | 'auto';
type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ColorScheme;
  colors: typeof Colors.light;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme() || 'light';
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  
  // Determine actual theme based on mode
  const theme: ColorScheme = themeMode === 'auto' ? systemTheme : themeMode;
  const colors = Colors[theme];

  // Load saved theme preference
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme');
      if (saved) setThemeModeState(saved as ThemeMode);
    } catch (e) {
      console.error('Failed to load theme', e);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('theme', mode);
      setThemeModeState(mode);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
