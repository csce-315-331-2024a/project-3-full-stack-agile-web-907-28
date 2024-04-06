// api/orders/deleteOrder.js
import { query } from '../../../utils/db'; // Adjust the import path as necessary

export default async function handler(req, res) {
  const { orderId } = req.query; // Extract orderId from query parameters

  if (req.method === 'DELETE') {
    try {
      // Assuming 'orders' is your table name and 'order_id' is the identifier column
      const result = await query(
        `DELETE FROM orders WHERE order_id = $1 RETURNING *;`, 
        [orderId]
      );

      if (result.rowCount === 0) {
        // No rows affected, meaning no order was found with the provided ID
        return res.status(404).json({ message: 'Order not found' });
      }

      // Order was found and deleted successfully
      res.status(200).json({ message: 'Order deleted successfully', deletedOrder: result.rows[0] });
    } catch (error) {
      console.error('Failed to delete order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any unsupported request methods
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
