import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * This component is a weather component. It uses the nextui-org library for the table and pagination.
 * @returns {JSX.Element} - The weather component.
 */
const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * This function handles the capitalization of the first letter of each word.
   * @param {string} str - The string to capitalize.
   * @returns {string} - The string with the first letter of each word capitalized.
   */
  const capitalizeFirstLetter = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  /**
   * This function handles the conversion of the temperature to Fahrenheit.
   * @param {string} str - The temperature to convert.
   * @returns {number} - The temperature in Fahrenheit.
   */
  const toFahrenheit = (str) => {
    return Math.round((parseInt(str) * 9 / 5)) + 32;
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data based on user's coordinates from the new OpenWeatherMap API
          const response = await axios.get(`/api/weather/weather?lat=${latitude}&lon=${longitude}`);
          if (response.status !== 200) {
            throw new Error('Failed to fetch weather data');
          }
          const data = response.data;
          setWeatherData(data);
        });
      } catch (error) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: '0 0 auto', marginRight: '10px' }}>
      <img
            style={{ height: '70px' }}
            src={`http://openweathermap.org/img/wn/${weatherData?.icon}.png`}
            alt={weatherData?.description || "Default weather description"}
          />
      </div>
      <div style={{color: 'white'}}>
        <h2>{weatherData ? `Today's Weather at ${weatherData.location}` : 'Loading...'}</h2>
        {error && <p>{error}</p>}
        {weatherData && (
          <p>
            {toFahrenheit(weatherData.temperature)}°F&nbsp;&nbsp;
            {capitalizeFirstLetter(weatherData.description)}
            
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
