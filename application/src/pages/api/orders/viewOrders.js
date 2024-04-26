// /pages/api/orders/viewOrders.js
import { query } from '../../../utils/db'; // Adjust the import path according to your project structure

/**
 * This API route is for viewing all orders along with customer names. It uses the next/api library for the API route.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all orders from the database along with customer names
      const result = await query(`
        SELECT orders.*, customers.name AS customer_name
        FROM orders
        JOIN customers ON orders.customer_id = customers.customer_id
        ORDER BY orders.placed_time DESC
        LIMIT 1000;
      `);
      
      // If the fetch is successful, return the orders with customer names
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any unsupported request methods
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}