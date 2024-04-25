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

  test('returns weather data for valid coordinates', async () => {
    const lat = '40.7128';
    const lon = '-74.006';

    const mockResponse = {
      name: 'New York',
      main: { temp: 20 },
      weather: [{ description: 'cloudy', icon: '01d' }],
    };

    mock.onGet(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f40e981e643b344ff4a07d2807527f91&units=metric`).reply(200, mockResponse);

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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      location: 'New York',
      temperature: 20,
      description: 'cloudy',
      icon: '01d',
    });
  });

  test('returns error for invalid coordinates', async () => {
    const lat = 'invalid';
    const lon = 'invalid';

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
