import { query } from '@/utils/db';
import InventoryItem from "@/models/InventoryItem";

/**
 * This function handles the GET request for inventory items
 * @param req {Request} The request object.
 * @param res {Response} The response object.
 */
export default async function handler(req, res) {
  try {
    const { rows } = await query("SELECT * FROM inventoryitem;");
    const inventoryItems = rows.map(row => new InventoryItem(
      row.inventoryitem_id,
      row.name,
      row.quantity,
      row.purchase_date,
      row.expiry_date,
      row.quantity_limit
    ));
    res.status(200).json(inventoryItems);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}