import { createContext, useContext, useState }      from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export const ThemeContext = createContext<Theme | null>(null);

export const SetThemeContext = createContext<Dispatch<SetStateAction<Theme>> | null>(null);

export function ThemeProvider({ children }: {children?: ReactNode}) {
  const [ theme, setTheme ] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <SetThemeContext.Provider value={setTheme}>
        {children}
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("No theme context");
  }
  return theme;
}

export function useSetTheme() {
  const setTheme = useContext(SetThemeContext);
  if (!setTheme) {
    throw new Error("No setTheme context");
  }
  return setTheme;
}

type Theme = "light" | "dark";
