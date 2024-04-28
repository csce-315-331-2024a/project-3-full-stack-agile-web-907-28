import React, { createContext, useState, useEffect, useContext } from 'react';

const ContrastContext = createContext();

export function ContrastContextProvider({ children }) {
  const [theme, setTheme] = useState('red'); // Default theme

  useEffect(() => {
    const fetchButtonPosition = async () => {
      try {
        // Use the button position to set the theme
        if (ColorContrastSwitch === toggleContrast) {
          setTheme('contrast');
        } else {
          setTheme('red');
        }
      } catch (error) {
        console.error('Failed to fetch button position for theme context', error);
      }
    };

    fetchButtonPosition();
  }, []);

  // Function to update theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ContrastContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ContrastContext.Provider>
  );
}

export function useContrastContext() {
  return useContext(ContrastContext);
}

export default ContrastContext;



