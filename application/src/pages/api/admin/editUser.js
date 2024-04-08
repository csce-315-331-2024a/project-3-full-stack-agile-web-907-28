// pages/api/admin/editUser.js
import { query } from '../../../utils/db'; // Adjust the import path according to your project structure

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, newName, newEmail, newCredentials } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required to identify the user.' });
  }

  // Prepare dynamic parts of the query
  let updates = [];
  let values = [];
  let counter = 1;

  if (newName && newName.trim() !== '') {
    updates.push(`name = $${counter}`);
    values.push(newName);
    counter++;
  }

  if (newEmail && newEmail.trim() !== '') {
    updates.push(`email = $${counter}`);
    values.push(newEmail);
    counter++;
  }

  if (newCredentials && newCredentials.trim() !== '') {
    updates.push(`credentials = $${counter}`);
    values.push(newCredentials);
    counter++;
  }

  // Ensure there is at least one field to update
  if (updates.length === 0) {
    return res.status(400).json({ message: 'No valid fields to update.' });
  }

  // Construct the final query
  const queryString = `
    UPDATE users
    SET ${updates.join(', ')}
    WHERE email = $${counter}
    RETURNING *;`;

  // Execute the query
  try {
    const result = await query(queryString, [...values, email]);
    if (result.rows.length > 0) {
      res.json({ user: result.rows[0] });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
