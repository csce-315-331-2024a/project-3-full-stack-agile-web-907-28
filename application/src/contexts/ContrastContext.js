import React, { createContext, useState, useEffect } from 'react';

const ContrastContext = createContext();

export function ContrastContextProvider({ children }) {
  const [theme, setTheme] = useState('red'); // Default theme

  useEffect(() => {
    const fetchButtonPosition = async () => {
      try {
        // Assuming there's some logic to determine the button position
        const buttonPosition = await determineButtonPosition();
        
        // Use the button position to set the theme
        if (buttonPosition === 'switched') {
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

  return (
    <ContrastContext.Provider value={{ theme }}>
      {children}
    </ContrastContext.Provider>
  );
}

export default ContrastContext;

