// /pages/api/orders/order.js
import { query } from '../../../utils/db'; // Adjust the import path according to your project structure

/**
 * This API route is for creating an order. It uses the next/api library for the API route.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { customer_id, employee_id, menuitem_ids, total } = req.body;

  if (!customer_id || !employee_id || !menuitem_ids || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Start transaction
    await query('BEGIN');

    // Insert the new order into the database
    const orderResult = await query(
      `INSERT INTO orders (customer_id, employee_id, menuitem_ids, total, placed_time, served_time, order_status)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pending') RETURNING *;`,
      [customer_id, employee_id, `{${menuitem_ids.join(",")}}`, total]
    );

    // Update inventory for each menu item
    for (const menuItemId of menuitem_ids) {
      const menuItem = await query('SELECT inventoryitem_ids, inventoryitem_amounts FROM menuitem WHERE menuitem_id = $1', [menuItemId]);
      const inventoryIds = menuItem.rows[0].inventoryitem_ids;
      const amounts = menuItem.rows[0].inventoryitem_amounts;

      for (let i = 0; i < inventoryIds.length; i++) {
        const inventoryId = inventoryIds[i];
        const amount = amounts[i];

        // Update inventory
        await query(
          'UPDATE inventoryitem SET quantity = quantity - $1 WHERE inventoryitem_id = $2 AND quantity >= $1',
          [amount, inventoryId]
        );
      }
    }

    // Commit transaction
    await query('COMMIT');

    // If insert is successful, return the created order
    res.status(201).json(orderResult.rows[0]);
  } catch (error) {
    // Rollback transaction in case of error
    await query('ROLLBACK');
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}