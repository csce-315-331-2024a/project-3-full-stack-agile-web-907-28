import { getSession } from "next-auth/react";
import { query } from '../../../utils/db'; // Adjust the import path to your database utility

/**
 * This function handles the GET request for fetching user credentials.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The user credentials.
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the user session
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const userEmail = session.user.email;

  try {
    // Fetch the user credentials from the database
    const result = await query('SELECT credentials FROM users WHERE email = $1', [userEmail]);
    if (result.rows.length > 0) {
      const credentials = result.rows[0].credentials;
      return res.status(200).json({ credentials });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user credentials:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
