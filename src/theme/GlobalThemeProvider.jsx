import React, { useMemo, useState, createContext } from 'react';
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { palette } from './palette';
import { typography } from './typography';

export const ThemeToggleContext = createContext();

const GlobalThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("light");
    const [open,setOpen]=useState(false)

    const themeConfig = useMemo(() => ({
        palette: {
            ...palette(themeMode)
        },
        typography,
    }), [themeMode]);

    const theme = createTheme(themeConfig);

    const toggleThemeMode = () => setThemeMode(prev => prev === "light" ? "dark" : "light");
    const toggleSideNav=()=>setOpen(prev=>!prev)
    return (
        <ThemeToggleContext.Provider value={{ toggleThemeMode ,open,toggleSideNav}}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeToggleContext.Provider>
    );
};

export default GlobalThemeProvider;
