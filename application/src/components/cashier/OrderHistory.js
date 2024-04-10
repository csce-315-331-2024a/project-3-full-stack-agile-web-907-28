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
    <div className="px-10" aria-label="Order History">
      <Table isStriped aria-label="Order History">
        <TableHeader aria-label="Order History">
          <TableColumn aria-label="Order ID">Order ID</TableColumn>
          <TableColumn aria-label="Customer ID">Customer ID</TableColumn>
          <TableColumn aria-label="Order Date">Order Date</TableColumn>
          <TableColumn aria-label="Order Status">Order Status</TableColumn>
          <TableColumn aria-label="Order Total">Order Total</TableColumn>
          <TableColumn aria-label="Actions">Actions</TableColumn>
        </TableHeader>
        <TableBody aria-label="Order History">
          {currentPageOrders.map(order => (
            <TableRow key={order.order_id} aria-label="Order History">
              <TableCell aria-label="Order ID">{order.order_id}</TableCell>
              <TableCell aria-label="Customer ID">{order.customer_id}</TableCell>
              <TableCell aria-label="Order Date">{order.placed_time}</TableCell>
              <TableCell aria-label="Order Status">Fulfilled</TableCell>
              <TableCell aria-label="Order Total">{order.total}</TableCell>
              <TableCell aria-label="Actions">
              <Button aria-label="Delete Order" auto color="error" ghost onClick={() => handleDelete(order.order_id)}>
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
        aria-label="Pagination"
      />
      </center>
    </div>
  );
};

export default OrderHistory;
