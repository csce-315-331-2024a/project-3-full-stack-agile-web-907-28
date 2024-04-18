// /pages/api/orders/order.js
import { query } from '../../../utils/db'; // Adjust the import path according to your project structure

/**
 * This API route is for creating an order. It uses the next/api library for the API route.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { customer_id, employee_id, menuitem_ids, total } = req.body;

  // Basic validation (you might want to add more comprehensive checks)
  if (!customer_id || !employee_id || !menuitem_ids || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Insert the new order into the database
    // Assuming your table name is 'orders' and columns match the request body fields
    const result = await query(
      `INSERT INTO orders (customer_id, employee_id, menuitem_ids, total, placed_time, served_time, order_status)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pending') RETURNING *;`,
      [customer_id, employee_id, `{${menuitem_ids.join(",")}}`, total] // menuitem_ids is an array, converting to Postgres array format
    );

    // If insert is successful, return the created order
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
