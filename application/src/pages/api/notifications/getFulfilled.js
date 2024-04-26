import { query } from '@/utils/db';

/**
 * This API endpoint is used to get all the fulfilled orders for a given customer name
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export default async function getFulfilled(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }

  try {
    const selectQuery = `
      SELECT o.*
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      WHERE c.name = $1
      AND o.order_status = 'Fulfilled';
    `;
    const { rows } = await query(selectQuery, [name]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No fulfilled orders found for the given customer name' });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}