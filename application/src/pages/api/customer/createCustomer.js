import { query } from '@/utils/db';
import Customer from '@/models/Customer';

export default async function createCustomer(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, payment_method, payment_number } = req.body;

  if (!name || !payment_method || !payment_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const insertQuery = `
      INSERT INTO customers (name, payment_method, payment_number)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await query(insertQuery, [name, payment_method, payment_number]);
    const newCustomer = Customer.parseDatabaseEntry(rows[0]);
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}