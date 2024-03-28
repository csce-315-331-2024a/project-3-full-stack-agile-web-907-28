// components/WeatherComponent.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather/weather');
        if (response.status !== 200) {
          throw new Error('Failed to fetch weather data');
        }
        const data = response.data;
        setWeatherData(data);
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
      <h2>Today's Weather in College Station, Texas</h2>
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
