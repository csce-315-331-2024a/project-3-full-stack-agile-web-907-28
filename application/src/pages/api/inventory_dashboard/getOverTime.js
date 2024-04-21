// Import the necessary modules
import { query } from '@/utils/db';

/**
 * API handler that fetches the amount of each inventory item used between two dates.
 * @param {Request} req - The request object, expecting 'startDate' and 'endDate' query parameters.
 * @param {Response} res - The response object used to return data or errors.
 */
export default async function handler(req, res) {
  const { startDate, endDate } = req.query;

  // Validate input dates
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Both start date and end date are required.' });
  }

  try {
    const sqlQuery = `
      SELECT 
        i.inventoryitem_id,
        i.name,
        SUM(ii.amount) AS total_amount_used
      FROM 
        inventoryitem i
      JOIN orders o ON o.placed_time::date BETWEEN $1 AND $2
      JOIN menuItem m ON m.menuItem_id = ANY(o.menuItem_ids)
      JOIN unnest(m.inventoryitem_ids) WITH ORDINALITY AS item(id, ord) ON TRUE
      JOIN unnest(m.inventoryitem_amounts) WITH ORDINALITY AS ii(amount, ord) ON ii.ord = item.ord
      WHERE i.inventoryitem_id = item.id
      GROUP BY i.inventoryitem_id, i.name
    `;

    // Execute the query with parameterized inputs
    const { rows } = await query(sqlQuery, [startDate, endDate]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
