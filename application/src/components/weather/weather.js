import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping between weather conditions and icon names
  const weatherIcons = {
    'blizzard': 'blizzard.png',
    'clear sky': 'clear.png',
    'cloudy': 'cloudy.png',
    'drizzle': 'drizzle.png',
    'fog': 'fog.png',
    'haze': 'haze.png',
    'mist': 'fog.png',
    'partly cloudy': 'partly_cloudy.png',
    'rain': 'rain.png',
    'showers': 'showers.png',
    'snow': 'snow.png',
    'thunderstorm': 'thunderstorm.png',
    'tornado': 'tornado.png',
    'windy': 'windy.png',
    'overcast': 'cloudy.png',
    'sunny': 'clear.png',
    'broken clouds': 'cloudy.png',
    'scattered clouds': 'cloudy.png',
    'few clouds': 'cloudy.png',
    'overcast clouds': 'cloudy.png',
    'mist': 'fog.png',
    'light rain': 'rain.png',
    'Heavy Rain': 'rain.png',
    'Light Rain': 'rain.png',
  };

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

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
          style={{ height: '50px' }}
          src={`/weather_icons/${weatherIcons[weatherData?.description]}`}
          alt={weatherData?.description}
        />
      </div>
      <div style={{color: 'white'}}>
        <h2>{weatherData ? `Today's Weather at ${weatherData.location}, ${capitalizeFirstLetter(weatherData.description)}` : 'Loading...'}</h2>
        {error && <p>{error}</p>}
        {weatherData && (
          <p>
            {weatherData.temperature} °C&nbsp;
            Humidity: {weatherData.humidity}%&nbsp;
            Wind Speed: {weatherData.windSpeed} m/s
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
