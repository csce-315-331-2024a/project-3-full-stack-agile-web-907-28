import { query } from '@/utils/db';
import Customer from '@/models/Customer';

export default async function handler(req, res) {
  try {
    console.log("Getting customers");
    const { rows } = await query("SELECT * FROM customers;");
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}