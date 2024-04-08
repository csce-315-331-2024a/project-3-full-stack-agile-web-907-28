import { Pool } from 'pg';

// Create a new pool with the connection string from the environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * This function queries the database with the given text and parameters.
 * @param {String}} text 
 * @param {Array} params 
 * @returns  {Promise}
 */
export async function query(text, params = []) {
  const client = await pool.connect(); 
  
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}