import React, { useState, useEffect } from 'react';
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';

const ORDERS_PER_PAGE = 20;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('/api/orders/viewOrders')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
        setTotalPages(Math.ceil(data.length / ORDERS_PER_PAGE));
      })
      .catch(error => console.error("Failed to fetch orders:", error));
  }, []);

  //HANDLE DELETE
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/deleteOrder?orderId=${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setOrders(orders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  // Calculate the orders to display on the current page
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const currentPageOrders = orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  return (
    <div className="px-10">
      <Table isStriped>
        <TableHeader>
          <TableColumn>Order ID</TableColumn>
          <TableColumn>Customer ID</TableColumn>
          <TableColumn>Order Date</TableColumn>
          <TableColumn>Order Status</TableColumn>
          <TableColumn>Order Total</TableColumn>
          <TableColumn>Actions</TableColumn>
          {/* Add more columns as needed */}
        </TableHeader>
        <TableBody>
          {currentPageOrders.map(order => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell>{order.placed_time}</TableCell>
              <TableCell>Fulfilled</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
              <Button auto color="error" ghost onClick={() => handleDelete(order.order_id)}>
                  ❌
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <center>
      <Pagination
        total={totalPages}
        initialPage={1}
        onChange={(page) => setCurrentPage(page)}
      />
      </center>
    </div>
  );
};

export default OrderHistory;
