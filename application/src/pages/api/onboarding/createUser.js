import { query } from '../../../utils/db';

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
        'INSERT INTO users (email, name, credentials, created_at, last_signed_in_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;',
        [email, name, credentials]
      );
      res.status(201).json(insertUserResult.rows[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
