import { query } from '@/utils/db';
import Customer from '@/models/Customer';

export default async function handler(req, res) {
  try {
    const selectQuery = `SELECT * FROM customers;`;
    const result = await query(selectQuery);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}