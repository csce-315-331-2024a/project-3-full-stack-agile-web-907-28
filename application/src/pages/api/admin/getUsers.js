import { query } from '../../../utils/db';

/**
 * This function handles the GET request to retrieve all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} - An array of user objects.
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Select all users
    const result = await query('SELECT * FROM users ORDER BY created_at DESC;', []);
    
    // Check if users are found
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      // No users found
      res.status(404).json({ message: 'No users found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
