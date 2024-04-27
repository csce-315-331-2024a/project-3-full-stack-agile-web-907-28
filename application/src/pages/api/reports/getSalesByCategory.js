import {query} from "@/utils/db";

/**
 * This function handles the retrieval of sales by category. It uses the /api/reports/getSalesByCategory endpoint to retrieve sales by category.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The response object.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let { startDate, endDate } = req.query;
  if (startDate) {
    startDate = new Date(startDate);
  }
  if (endDate) {
    endDate = new Date(endDate);
  } else {
    endDate = new Date();
  }
  if (!startDate) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  const queryStr = `
    WITH salesByMenuItem as (
      SELECT
        unnest(menuItem_ids) as menuitem_id,
        COUNT(*) as count
      FROM
        orders
      WHERE
        $1 <= placed_time AND placed_time <= $2
      GROUP BY
        menuitem_id
    )
    SELECT
      SUM(salesByMenuItem.count) AS count,
      menuitem.category_id
    FROM salesByMenuItem
    INNER JOIN
      menuitem ON salesByMenuItem.menuitem_id = menuitem.menuitem_id
    GROUP BY
      menuitem.category_id
    ;
  `;
  try {
    const queryResult = await query(queryStr, [startDate.toISOString(), endDate.toISOString()]);


    return res.status(200).json(queryResult.rows);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
