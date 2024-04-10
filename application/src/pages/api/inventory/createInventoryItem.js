import { query } from "@/utils/db";
import InventoryItem from "@/models/InventoryItem";

/**
 * Handles the POST request to create a new inventory item in the database.
 * @param req {Request} The HTTP request object.
 * @param res {Response} The HTTP response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { inventoryItem } = req.body;
  if (inventoryItem === null || inventoryItem === undefined) {
    return res.status(400).json({ message: "Empty request body" });
  }

  try {
    // Double-check that the inventory item doesn't already exist
    const findResult = await query("SELECT * FROM inventoryitem WHERE inventoryitem_id=$1 OR name=$2", [inventoryItem.inventoryItemId, inventoryItem.name]);
    if (findResult.rows.length > 0) {
      return res.status(401).json({ message: "Inventory item already exists." });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const queryString = "INSERT INTO inventoryitem (inventoryitem_id, name, quantity, purchase_date, expiry_date, quantity_limit) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *;";
  const queryParams = [inventoryItem.name, inventoryItem.quantity, inventoryItem.purchaseDate, inventoryItem.expiryDate, inventoryItem.quantityLimit];
  try {
    const queryResult = await query(queryString, queryParams);
    return res.status(200).json(InventoryItem.parseDatabaseEntry(queryResult.rows[0]));
  } catch (e) {
    return res.status(501).json({ message: "Internal server error" });
  }
}
