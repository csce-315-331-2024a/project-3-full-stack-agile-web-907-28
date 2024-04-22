import { query } from '@/utils/db';
import InventoryItem from "@/models/InventoryItem";

/**
 * This function handles the GET request for inventory items that are in shortage.
 * @param req {Request} The request object.
 * @param res {Response} The response object.
 */
export default async function handler(req, res) {
  try {
    // Update the query to select only items where quantity is less than quantity_limit
    const { rows } = await query("SELECT * FROM inventoryitem WHERE quantity < quantity_limit;");
    const inventoryItems = rows.map(InventoryItem.parseDatabaseEntry);
    return res.status(200).json(inventoryItems);
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
