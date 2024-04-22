import {query} from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let { startDate, endDate, timeScale } = req.query;
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
  if (!timeScale) {
    timeScale = "day";
  } else if (timeScale !== "day" && timeScale !== "month") {
    return res.status(422).json({ message: "Invalid time scale" });
  }

  const s = (timeScale === "day") ? (
    "DATE(placed_time)"
  ) : (
    "to_char(placed_time, 'YYYY-MM')"
  )
  const queryStr = `
    SELECT
      ${s} AS placed_date,
      unnest(menuItem_ids) as menuitem_id,
      COUNT(*) FROM orders
    WHERE
      placed_time >= $1 AND placed_time < $2
    GROUP BY
      menuitem_id,
      ${s}
    ORDER BY
      ${s} ASC
    ;
  `;
  try {
    const queryResult = await query(queryStr, [startDate.toISOString(), endDate.toISOString()]);
    let salesByItemAndDate = {};
    for (const row of queryResult.rows) {
      if (salesByItemAndDate[row.menuitem_id]) {
        salesByItemAndDate[row.menuitem_id].push(row);
      } else {
        salesByItemAndDate[row.menuitem_id] = [row];
      }
    }

    return res.status(200).json(salesByItemAndDate);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
