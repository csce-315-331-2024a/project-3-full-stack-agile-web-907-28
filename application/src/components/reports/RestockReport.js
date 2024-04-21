import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

/**
 * The webpage for the restock report.
 * @param {*} props 
 * @returns 
 */
export default function RestockReport({ ...props }) {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInventoryData() {
      setLoading(true);
      try {
        const response = await fetch("/api/inventory_dashboard/getRestockReport");
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
      setLoading(false);
    }

    fetchInventoryData();
  }, []);

  return (
    <Card {...props}>

      <CardHeader>
        <p className="text-xl font-semibold">Restock Report</p>
      </CardHeader>
      <Table aria-label="Inventory shortage table" css={{ maxHeight: "300px" }}>
        <TableHeader>
          <TableColumn key="name">Item Name</TableColumn>
          <TableColumn key="quantity">Quantity</TableColumn>
        </TableHeader>
        <TableBody>
          {inventoryItems.map(item => (
            <TableRow key={item.inventoryItemId}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <Spinner />}
    </Card>
  );
}
