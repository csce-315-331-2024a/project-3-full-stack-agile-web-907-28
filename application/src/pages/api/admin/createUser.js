// Import the 'query' utility from your database utilities.
import { query } from '../../../utils/db';

/**
 * Handles the POST request to create a new user in the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns A response object with the newly created user or an existing user.
 */
export default async function handler(req, res) {
  // Destructure 'email', 'name', and 'credentials' from the request body.
  const { email, name, credentials } = req.body;

  try {
    // First, check if a user with the same email already exists in the database.
    const findUserResult = await query('SELECT * FROM users WHERE email = $1;', [email]);
    
    if (findUserResult.rows.length > 0) {
      // If a user with the given email exists, return the existing user.
      return res.status(200).json({ message: 'User already exists.', user: findUserResult.rows[0] });
    } else {
      // If no user exists with the given email, insert a new user into the database.
      const insertUserResult = await query(
        'INSERT INTO users (email, name, created_at, last_signed_in_at, credentials) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $3) RETURNING *;',
        [email, name, credentials]
      );
      
      // Return the newly created user.
      return res.status(201).json({ message: 'User created successfully.', user: insertUserResult.rows[0] });
    }
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response.
    console.error('Failed to create user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
