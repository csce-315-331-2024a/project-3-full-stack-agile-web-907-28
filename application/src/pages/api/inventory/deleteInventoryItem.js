import { query } from "@/utils/db";

/**
 * Handles the POST request to delete an inventory item from the database.
 * @param req {Request} The HTTP request object.
 * @param res {Response} The HTTP response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;
  if (id === null || id === undefined) {
    return res.status(400).json({ message: "Empty request body" });
  }

  const queryString = "DELETE FROM inventoryitem WHERE inventoryitem_id=$1;";
  const queryParams = [id];
  try {
    const queryResult = await query(queryString, queryParams);
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
