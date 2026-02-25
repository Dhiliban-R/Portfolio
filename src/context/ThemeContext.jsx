import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [scrollProgress, setScrollProgress] = useState(0); // 0 = blue, 1 = green
    const [primaryColor, setPrimaryColor] = useState('#0066AE');

    const interpolateColor = useCallback((progress) => {
        // HCL Blue: #0066AE = rgb(0, 102, 174)
        // GUVI Green: #14E885 = rgb(20, 232, 133)
        const r = Math.round(0 + (20 - 0) * progress);
        const g = Math.round(102 + (232 - 102) * progress);
        const b = Math.round(174 + (133 - 174) * progress);
        return `rgb(${r}, ${g}, ${b})`;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

            setScrollProgress(progress);
            const color = interpolateColor(progress);
            setPrimaryColor(color);
            document.documentElement.style.setProperty('--brand-primary', color);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [interpolateColor]);

    return (
        <ThemeContext.Provider value={{ scrollProgress, primaryColor, interpolateColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};
