import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import ListPagination from "@/components/utils/ListPagination";

/**
 * The webpage for the restock report.
 * @param {*} props 
 * @returns 
 */
export default function RestockReport({ ...props }) {
  const [inventoryItems, refreshInventoryItems] = useApiFetch("/api/inventory_dashboard/getRestockReport", []);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [inventoryItems]);

  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Restock Report</p>
      </CardHeader>
      {
        inventoryItems.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <Table aria-label="Inventory shortage table" isStriped>
              <TableHeader>
                <TableColumn key="name">Item Name</TableColumn>
                <TableColumn key="quantity">Quantity</TableColumn>
              </TableHeader>
              <TableBody>
                {inventoryItems.slice(startIndex, startIndex + 5).map(item => (
                  <TableRow key={item.inventoryItemId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {
              inventoryItems.length > 5 ? (
                <ListPagination numItems={inventoryItems.length} itemsPerPage={5} setStartIndex={setStartIndex} />
              ) : (
                <></>
              )
            }
          </>
        )
      }
    </Card>
  );
}
