import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#0066AE'); // Default HCL Blue
  const [sentimentColor, setSentimentColor] = useState(null);

  // Transition helper
  const updateTheme = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--theme-color', color);
  };

  const setSentiment = (state) => {
    if (state === 'positive') {
      setSentimentColor('#14E885');
      setTimeout(() => setSentimentColor(null), 3000); // Pulse effect for 3 seconds
    }
  };

  // Sync state with CSS Variable
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', sentimentColor || themeColor);
  }, [themeColor, sentimentColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, updateTheme, sentimentColor, setSentiment }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
