import React, {useContext, useEffect, useState} from 'react';
import { Card, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import {DateRangeContext} from "@/contexts/DateRangeContext";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import ListPagination from "@/components/utils/ListPagination";

/**
 * This function handles the creation of the Excess Report. It fetches the data from the /api/inventory_dashboard/getExcessReport endpoint and displays it in a table.
 * @param {*} props - The props of the component.
 * @returns {JSX.Element}
 */
export default function ExcessReport({ ...props }) {
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [data, setData] = useApiFetch(fetchUrl, []);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    setFetchUrl(`/api/inventory_dashboard/getExcessReport?startDate=${sd}&endDate=${ed}`);
  }, [dateRange]);

  useEffect(() => {
    setStartIndex(0);
  }, [data]);

  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Excess Inventory</p>
      </CardHeader>
      {
        data.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <Table aria-label="Excess Inventory Report" isStriped>
              <TableHeader>
                <TableColumn key="name">Item Name</TableColumn>
                <TableColumn key="quantity">Current Quantity</TableColumn>
              </TableHeader>
              <TableBody>
                {data.slice(startIndex, startIndex + 5).map(item => (
                  <TableRow key={item.inventoryItemId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {
              data.length > 5 ? (
                <ListPagination numItems={data.length} itemsPerPage={5} setStartIndex={setStartIndex} />
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
