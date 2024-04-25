import { query } from '@/utils/db';
import Customer from '@/models/Customer';

export default async function getCustomers(req, res) {
  try {
    const { rows } = await query('SELECT * FROM customers;');
    const customers = rows.map(Customer.parseDatabaseEntry);
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

