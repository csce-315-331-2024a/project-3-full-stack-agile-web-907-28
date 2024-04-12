import { query } from '../../../utils/db'; // Assuming you have a utility for database operations

/**
 * This API route is for deleting a user. It uses the next/api library for the API route.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  const { email } = req.body;

  try {
    const result = await query('DELETE FROM users WHERE email = $1 RETURNING *;', [email]);
    
    if (result.rows.length) {
      res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
