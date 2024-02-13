import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(null);

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('isDarkMode');
        if (storedDarkMode !== null) {
            setIsDarkMode(storedDarkMode === 'true');
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode);
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <div className={isDarkMode ? 'dark' : ''}>
                {children}
            </div>
        </DarkModeContext.Provider >
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
