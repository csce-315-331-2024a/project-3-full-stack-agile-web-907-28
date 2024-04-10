import { query } from "@/utils/db";
import InventoryItem from "@/models/InventoryItem";

/**
 * Handles the POST request to update an inventory item in the database.
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

  const queryString = "UPDATE inventoryitem SET name=$2, quantity=$3, purchase_date=$4, expiry_date=$5, quantity_limit=$6 WHERE inventoryitem_id=$1 RETURNING *;";
  const queryParams = [inventoryItem.inventoryItemId, inventoryItem.name, inventoryItem.quantity, inventoryItem.purchaseDate, inventoryItem.expiryDate, inventoryItem.quantityLimit];
  try {
    const queryResult = await query(queryString, queryParams);
    if (queryResult.rows.length > 0) {
      const newItem = InventoryItem.parseDatabaseEntry(queryResult.rows[0]);
      return res.status(200).json(newItem);
    } else {
      return res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
