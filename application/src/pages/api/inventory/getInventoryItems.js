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
      parseInt(row.inventoryitem_id),
      row.name,
      parseFloat(row.quantity),
      new Date(row.purchase_date),
      new Date(row.expiry_date),
      parseFloat(row.quantity_limit)
    ));
    res.status(200).json(inventoryItems);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}