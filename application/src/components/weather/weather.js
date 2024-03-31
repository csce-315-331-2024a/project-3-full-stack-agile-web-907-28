// components/WeatherComponent.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping between weather conditions and icon names
  const weatherIcons = {
    'blizzard': 'blizzard.png',
    'clear': 'clear.png',
    'cloudy': 'cloudy.png',
    'drizzle': 'drizzle.png',
    'fog': 'fog.png',
    'haze': 'haze.png',
    'partly_cloudy': 'partly_cloudy.png',
    'rain': 'rain.png',
    'showers': 'showers.png',
    'snow': 'snow.png',
    'thunderstorms': 'thunderstorms.png',
    'tornado': 'tornado.png',
    'windy': 'windy.png',
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data based on user's coordinates
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
    <div>
      <h2>Today's Weather at {weatherData?.location}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temperature} °C  Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%  Wind Speed: {weatherData.windSpeed} km/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;

