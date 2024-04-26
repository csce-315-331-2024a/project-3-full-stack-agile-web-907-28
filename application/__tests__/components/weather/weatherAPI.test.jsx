import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import handler from '@/pages/api/weather/weather';

describe('Weather API', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test('returns error for non-200 status code from OpenWeatherMap API', async () => {
    const lat = '40.7128';
    const lon = '-74.006';

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f40e981e643b344ff4a07d2807527f91&units=metric`).reply(500);

    const req = {
      query: {
        lat,
        lon,
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching weather data' });
  });

  test('returns error for invalid response format from OpenWeatherMap API', async () => {
    const lat = '40.7128';
    const lon = '-74.006';

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f40e981e643b344ff4a07d2807527f91&units=metric`).reply(200, {});

    const req = {
      query: {
        lat,
        lon,
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching weather data' });
  });

  test('returns error for network failure when calling OpenWeatherMap API', async () => {
    const lat = '40.7128';
    const lon = '-74.006';

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f40e981e643b344ff4a07d2807527f91&units=metric`).networkError();

    const req = {
      query: {
        lat,
        lon,
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching weather data' });
  });
});
