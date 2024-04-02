// components/WeatherComponent.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping between weather conditions and icon names
  const weatherIcons = {
    'Blizzard': 'blizzard.png',
    'Clear': 'clear.png',
    'Cloudy': 'cloudy.png',
    'Drizzle': 'drizzle.png',
    'Fog': 'fog.png',
    'Haze': 'haze.png',
    'Partly_cloudy': 'partly_cloudy.png',
    'Rain': 'rain.png',
    'Showers': 'showers.png',
    'Snow': 'snow.png',
    'Thunderstorms': 'thunderstorms.png',
    'Tornado': 'tornado.png',
    'Windy': 'windy.png',
    'Overcast': 'cloudy.png'
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
          <p>Temperature: {weatherData.temperature} °C  Description: {weatherData.description}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>
        <img
          style={{ height: '25px' }}
          src={`/weather_icons/${weatherIcons[weatherData.description]}`}
          alt={weatherData.description}
        />
        </span>
        <p>
          {weatherData.temperature} °C&nbsp;
          Humidity: {weatherData.humidity}%&nbsp;
          Wind Speed: {weatherData.windSpeed} m/s
        </p>
      </div>
      )}
    </div>
  );
};

export default WeatherComponent;

