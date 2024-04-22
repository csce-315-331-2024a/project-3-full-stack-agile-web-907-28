import React, { useState } from 'react';
import { Card, CardHeader, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

export default function ExcessReport({ ...props }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to trigger data fetch
  const fetchData = () => {
    if (!selectedDate) return; // Ensure we have a date selected
    const endDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    setIsLoading(true);
    fetch(`/api/inventory_dashboard/getExcessReport?startDate=${selectedDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        setError('Failed to load data');
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-semibold">Excess Inventory</p>
          <div className="flex gap-4">
            <input
              required
              label="Date"
              type="date"
              className="w-fit px-1 border-2 border-gray-300 rounded-md"
              value={selectedDate}
              onChange={e => handleDateChange(e.target.value)}
            />
            <Button auto onClick={fetchData} disabled={!selectedDate} className="w-fit px-10">
              Fetch Report
            </Button>
          </div>
        </div>
      </CardHeader>
      {isLoading && <Spinner />}
      {error && <div>{error}</div>}
      {data && (
        <Table aria-label="Excess Inventory Report" css={{ maxHeight: "300px" }}>
          <TableHeader>
            <TableColumn key="name">Item Name</TableColumn>
            <TableColumn key="quantity">Current Quantity</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.inventoryItemId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
