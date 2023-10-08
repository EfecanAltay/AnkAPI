import SnackbarContextData from '@/common/contexts/snackbar.context';
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const SnackbarContext = createContext<SnackbarContextData>(new SnackbarContextData());
export const AuthContext = createContext(null);