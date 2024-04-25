import { query } from '../../../utils/db'; // Adjust the import path according to your project structure


/**
 * This API is used to change the items in an order & its total in the DB
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order_id, menuitem_ids, total } = req.body;
  if (!order_id || !menuitem_ids || !total) {
    return res.status(400).json({ message: "Empty request body" });
  }

  const queryString = `
    UPDATE orders
    SET
      menuitem_ids = $1,
      total = $2
    WHERE order_id = $3
    RETURNING *
    ;
  `;
  const queryParams = [menuitem_ids, total, order_id];
  try {
    const queryResult = await query(queryString, queryParams);
    if (queryResult.rows.length > 0) {
      return res.status(200).json(queryResult);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
