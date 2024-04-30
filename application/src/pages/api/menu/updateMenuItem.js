import { query } from "@/utils/db";
import InventoryItem from "@/models/InventoryItem";
import MenuItem from "@/models/MenuItem";

/**
 * Handles the POST request to update a menu item in the database.
 * @param req {Request} The HTTP request object.
 * @param res {Response} The HTTP response object.
 * @returns {Promise<Response>} A response object with the newly created inventory item or an existing one.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { menuItem } = req.body;
  if (menuItem === null || menuItem === undefined) {
    return res.status(400).json({ message: "Empty request body" });
  }

  const queryString = "UPDATE menuitem SET name=$2, price=$3, inventoryitem_ids=$4, inventoryitem_amounts=$5, category_id=$6, seasonal=$7, seasonal_start=$8, seasonal_end=$9, image_source=$10 WHERE menuitem_id=$1 RETURNING *;";
  const queryParams = [menuItem.menuItemId, menuItem.name, menuItem.price, menuItem.inventoryItemIds, menuItem.inventoryItemAmounts, menuItem.categoryId, menuItem.seasonal, menuItem.startDate, menuItem.endDate, menuItem.imageSrc];
  try {
    const queryResult = await query(queryString, queryParams);
    if (queryResult.rows.length > 0) {
      const newItem = MenuItem.parseDatabaseEntry(queryResult.rows[0]);
      return res.status(200).json(newItem);
    } else {
      return res.status(404).json({ message: "Menu item not found" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
