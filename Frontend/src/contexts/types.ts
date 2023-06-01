import { ReactNode } from 'react';

export interface ColorModeContextProps {
  toggleColorMode: () => void;
}

export interface ColorModeProviderProps {
  children: ReactNode;
}
