import { query } from '@/utils/db';
import Customer from '@/models/Customer';

/**
 * This function handles the retrieval of a customer by name. It uses the /api/customer/getOneCustomer endpoint to retrieve a customer by name.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response object.
 */
export default async function getCustomerByName(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }

  try {
    const selectQuery = `
      SELECT * FROM customers WHERE name = $1;
    `;
    const { rows } = await query(selectQuery, [name]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No customer found with the given name' });
    }

    const customer = Customer.parseDatabaseEntry(rows[0]);
    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}