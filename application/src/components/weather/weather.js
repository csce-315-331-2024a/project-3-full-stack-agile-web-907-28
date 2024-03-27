// components/Weather.js

import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather Information for {city}</h2>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}</p>
          <p>Wind Speed: {weatherData.windSpeed}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
