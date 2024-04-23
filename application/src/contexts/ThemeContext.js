import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a Context
const ThemeContext = createContext([]);
export default ThemeContext;
/**
 * This is the provider for the theme context
 * @param {*} param0 
 * @returns 
 */
export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('summer'); // Default theme

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Assuming navigator.geolocation.getCurrentPosition is available
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data based on user's coordinates
          const response = await axios.get(`/api/weather/weather?lat=${latitude}&lon=${longitude}`);
          if (response.status === 200) {
            const data = response.data;
            // Assuming temperature is in Celsius and deciding the theme based on it
            const tempInFahrenheit = Math.round((parseInt(data.temperature) * 9 / 5)) + 32;
            if (tempInFahrenheit >= 50) { // Assuming 50°F as the threshold for summer
              setTheme('summer');
            } else {
              setTheme('winter');
            }
          }
        });
      } catch (error) {
        console.error('Failed to fetch weather data for theme context', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

