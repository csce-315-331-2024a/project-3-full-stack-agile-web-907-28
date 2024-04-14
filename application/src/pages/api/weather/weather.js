// pages/api/weather/weather.js

import axios from 'axios';

/**
 * This API route is for fetching the weather data. It uses the axios library for the API call.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query;
    
    // Fetch weather data from OpenWeatherMap service based on latitude and longitude
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f40e981e643b344ff4a07d2807527f91&units=metric`);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = response.data;
    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
}
