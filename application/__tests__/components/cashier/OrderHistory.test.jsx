import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderHistory from '../../../src/components/cashier/OrderHistory'; // Adjust the import path as needed
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

// Mock the global fetch API
global.fetch = jest.fn();

beforeEach(() => {
  // Clear all mocks before each test
  fetch.mockClear();
});

it('renders without crashing', async () => {
  // Mock the fetch response for the initial data loading
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ([]), // Return an empty array for simplicity
  });

  render(<OrderHistory />);

  // Optionally, wait for the component to finish loading data
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Check for the presence of a grid (instead of a table) or pagination, indicating successful render
  expect(screen.getByRole('grid')).toBeInTheDocument();
});

