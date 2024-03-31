// pages/api/weather/weather.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query;
    
    // Fetch weather data from WeatherAPI service based on latitude and longitude
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=3283f9228f64468f879230930242803&q=${lat},${lon}`);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = response.data;
    const weatherData = {
      location: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph, // Convert km/h to m/s
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}
