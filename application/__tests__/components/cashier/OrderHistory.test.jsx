import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderHistory from '../../../src/components/cashier/OrderHistory'; // Adjust the import path as needed
import userEvent from '@testing-library/user-event';
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

it('handles order deletion successfully', async () => {
  // Mock the initial fetch call for loading orders
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ([
      { order_id: 1, item: 'Coffee' },
      { order_id: 2, item: 'Tea' }
    ]), // Mock initial orders
  });

  // Mock the fetch call for deleting an order
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({}), // Mock empty response for deletion
  });

  render(<OrderHistory />);

  // Wait for the component to load the initial orders
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Assuming your component renders a button for deletion with a data attribute like `data-testid={`delete-${order.order_id}`}`
  // Simulate clicking the delete button for the order with id 1
  userEvent.click(screen.getByTestId('delete-1'));

  // Wait for the delete fetch call to be made
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

  // Check if the fetch for deletion was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith(`/api/orders/deleteOrder?orderId=1`, {
    method: 'DELETE',
  });

  // Optionally, check if the order with id 1 has been removed from the UI
  // This step depends on how your component updates its state and renders the list of orders
});

//Fail the delete on purpose
it('fails order deletion as expected', async () => {
  // Mock the fetch call for loading orders before deletion attempt
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ([
      { order_id: 1, item: 'Coffee' },
      { order_id: 2, item: 'Tea' }
    ]), // Mock initial orders
  });

  // Mock the fetch call for deleting an order to fail
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => ({ error: 'Order not found' }), // Mock error response
  });

  render(<OrderHistory />);

  // Wait for the orders to be loaded
  await waitFor(() => expect(screen.getByTestId('delete-1')).toBeInTheDocument());

  // Simulate clicking the delete button for an order
  userEvent.click(screen.getByTestId('delete-1'));

  // Wait for the delete fetch call to be made
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

  // Check if the fetch for deletion was called with the correct parameters
  expect(fetch).toHaveBeenCalledWith(`/api/orders/deleteOrder?orderId=1`, {
    method: 'DELETE',
  });

  // Check for error handling, e.g., displaying an error message
  // This assumes your component shows an error message with a test id of 'error-message' upon deletion failure
  await waitFor(() => expect(screen.getByTestId('error-message')).toHaveTextContent('Network response was not ok'));
});

it('displays an error message when fetching orders fails', async () => {
  // Mock the fetch call for loading orders to fail
  fetch.mockRejectedValueOnce(new Error('Failed to fetch orders'));

  render(<OrderHistory />);

  // Wait for the component to attempt loading orders and handle the error
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Check for error handling, e.g., displaying an error message
  // This assumes your component shows an error message with a test id of 'error-message' upon fetch failure
  await waitFor(() => expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to load orders.'));
});