import { query } from '../../../utils/db'; // Adjust the import path according to your project structure

//Chnage the order_status in the orders table to the value passed in the request body

/**
 * This API is used to change the order status in the orders table to the value passed in the request body
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
    const { order_id, order_status } = req.body;
    const { rows } = await query(`UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *;`, [order_status, order_id]);
    res.json(rows[0]);
}

