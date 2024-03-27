// pages/api/weather.js

import axios from 'axios';

export default async function handler(req, res) {
  const { city } = req.query;

  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
    const weatherData = response.data;

    // Process the data as needed before sending the response
    const processedData = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };

    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}
