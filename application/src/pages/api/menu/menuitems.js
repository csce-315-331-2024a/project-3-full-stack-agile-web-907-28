import { query } from '../../../utils/db';
import MenuItem from '../../../models/MenuItem';

/**
 * This function handles the GET request for menu items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function handler(req, res) {
  try {
    const { rows } = await query('SELECT * FROM menuitem;');
    const menuItems = rows.map(row => new MenuItem(
      row.menuitem_id,
      row.name,
      row.price,
      row.inventoryitem_ids,
      row.inventoryitem_amounts,
      row.category_id,
      row.seasonal,
      row.seasonal_start,
      row.seasonal_end,
    ));
    res.status(200).json(menuItems);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}