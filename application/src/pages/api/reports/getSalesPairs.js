import {query} from "@/utils/db";

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
    WITH
      TimeFilteredOrders AS (
        SELECT
          order_id,
          menuItem_ids
        FROM orders
        WHERE
          $1 <= placed_time AND placed_time <= $2
      ),
      UnnestedOrders AS (
        SELECT
          order_id,
          unnest(menuItem_ids) AS menuItem_id
        FROM TimeFilteredOrders
      ),
      Pairs AS (
        SELECT
          a.order_id,
          a.menuItem_id as item1,
          b.menuItem_id as item2
        FROM
          UnnestedOrders a
        JOIN
          UnnestedOrders b ON a.order_id = b.order_id AND a.menuItem_id < b.menuItem_id
      ),
      PairCounts AS (
        SELECT
          item1,
          item2,
          COUNT(*) as frequency
        FROM
          Pairs
        GROUP BY
          item1,
          item2
      ),
      PairNames AS (
        SELECT
          pc.item1,
          pc.item2,
          pc.frequency,
          a.name as item1_name,
          b.name as item2_name
        FROM
          PairCounts pc
        JOIN
          menuItem a ON pc.item1 = a.menuItem_id
        JOIN
          menuItem b ON pc.item2 = b.menuItem_id
      )
      SELECT
        item1_name,
        item2_name,
        frequency
      FROM
        PairNames
    ORDER BY frequency DESC;
  `;
  try {
    const queryResult = await query(queryStr, [startDate.toISOString(), endDate.toISOString()]);

    return res.status(200).json(queryResult.rows);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
