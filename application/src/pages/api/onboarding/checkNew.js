// pages/api/user/check-new.js
import { query } from '../../../utils/db'; // Adjust import path as necessary

/**
 * This function handles the POST request for checking if a user is new.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The user status.
 */
export default async function handler(req, res) {
  const { email } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE email = $1;', [email]);
    if (result.rows.length > 0) {
      // Assuming there's a column `is_new_user` to indicate if the user is new
      const isNewUser = result.rows[0].is_new_user;
      res.status(200).json({ isNewUser });
    } else {
      // Handle case where user is not found; maybe they are new and not yet added to the database
      res.status(200).json({ isNewUser: true });
    }
  } catch (error) {
    console.error('Error checking user status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
