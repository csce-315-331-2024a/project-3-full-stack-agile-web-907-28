import { query } from "@/utils/db";
import MenuItem from "@/models/MenuItem";

/**
 * Handles the POST request to create a new menu item in the database.
 * @param req {Request} The HTTP request object.
 * @param res {Response} The HTTP response object.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { menuItem } = req.body;
  if (menuItem === null || menuItem === undefined) {
    return res.status(400).json({ message: "Empty request body" });
  }

  try {
    // Double-check that the inventory item doesn't already exist
    const findResult = await query("SELECT * FROM menuitem WHERE menuitem_id=$1 OR name=$2", [menuItem.menuItemId, menuItem.name]);
    if (findResult.rows.length > 0) {
      return res.status(401).json({ message: "Menu item already exists." });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const queryString = "INSERT INTO menuitem (menuitem_id, name, price, inventoryitem_ids, inventoryitem_amounts, category_id, seasonal, seasonal_start, seasonal_end) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;";
  const queryParams = [menuItem.name, menuItem.price, menuItem.inventoryItemIds, menuItem.inventoryItemAmounts, menuItem.categoryId, menuItem.seasonal, menuItem.startDate, menuItem.endDate];
  try {
    const queryResult = await query(queryString, queryParams);
    return res.status(200).json(MenuItem.parseDatabaseEntry(queryResult.rows[0]));
  } catch (e) {
    return res.status(501).json({ message: "Internal server error" });
  }
}
