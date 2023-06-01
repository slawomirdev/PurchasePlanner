import React, { createContext, useEffect, useMemo, useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
  ColorModeContextProps,
  ColorModeProviderProps,
} from 'src/contexts/types';

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    window.localStorage.getItem('appTheme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    window.localStorage.setItem('appTheme', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: 'Nunito, Arial, sans-serif',
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
