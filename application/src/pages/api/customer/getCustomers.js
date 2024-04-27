import { query } from '@/utils/db';
import Customer from '@/models/Customer';

/**
 * This function handles the retrieval of customers. It uses the /api/customer/getCustomers endpoint to retrieve customers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response object.
 */
export default async function handler(req, res) {
  const range = req.query.range;

  try {
    const { rows } = await query("SELECT * FROM customers ORDER BY customer_id DESC LIMIT 30000");
    const customers = rows.map(Customer.parseDatabaseEntry);
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
