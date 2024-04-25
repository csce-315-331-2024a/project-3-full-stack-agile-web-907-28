import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import WeatherComponent from '@/components/weather/weather';

describe('WeatherComponent', () => {
  test('renders loading state initially', async () => {
    render(<WeatherComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message if fetching weather data fails', async () => {
    // Mocking geolocation API
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
        error({ message: 'Geolocation error' })
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    render(<WeatherComponent />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument();
    });
  });

 });
