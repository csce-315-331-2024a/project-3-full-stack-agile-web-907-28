import { query } from '../../../utils/db';

/**
 * This function handles the POST request for creating a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The user object. 
 */
export default async function handler(req, res) {
  const { email, name, credentials } = req.body;

  try {
    // Check if the user exists
    const findUserResult = await query('SELECT * FROM users WHERE email = $1;', [email]);
    
    if (findUserResult.rows.length > 0) {
      // User already exists
      res.status(200).json(findUserResult.rows[0]);
    } else {
      // Insert the new user
      const insertUserResult = await query(
        'INSERT INTO users (email, name, created_at, last_signed_in_at, credentials) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $3) RETURNING *;',
        [email, name, credentials]
      );
      res.status(201).json(insertUserResult.rows[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
