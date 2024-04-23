import React, { useState, useEffect } from 'react';
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem } from '@nextui-org/react';
import ListPagination from "@/components/utils/ListPagination";
import {FaTrashCan} from "react-icons/fa6";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import useSortedArray, {SortProperties} from "@/react-hooks/useSortedArray";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";

const ORDERS_PER_PAGE = 20;

/**
 * This component is the order history page for the cashier. It uses the nextui-org library for the table and pagination.
 * @returns {JSX.Element} - The order history page.
 */
const OrderHistory = () => {

  const [orders, refreshOrders] = useApiFetch('/api/orders/viewOrders', []);
  const [sortedOrders, sortProps, setSortProps] = useSortedArray(orders, SortProperties.byProperty("placed_time", "desc"));
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message

  // Function to check if the order is less than 10 minutes old
  const isOrderPending = (placedTime) => {
    const tenMinutesAgo = new Date(new Date() - 10 * 60000);
    console.log(placedTime);
    console.log(tenMinutesAgo);
    return new Date(placedTime) > tenMinutesAgo;
  };

  // Function to handle status change (you might need to implement actual change logic based on your backend)
  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId);
    console.log(newStatus);
    try {
      const response = await fetch(`/api/orders/changeStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: orderId, order_status: newStatus }),
      });
      refreshOrders();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  //HANDLE DELETE
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/deleteOrder?orderId=${orderId}`, {
        method: 'DELETE',
      });
      refreshOrders();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  // When the array is refreshed or resorted, go back to the first page.
  useEffect(() => {
    setStartIndex(0);
  }, [sortedOrders]);

  // Only display the menu items on the current page.
  useEffect(() => {
    setCurrentPageOrders(sortedOrders
      .slice(startIndex, startIndex + ORDERS_PER_PAGE));
  }, [sortedOrders, startIndex, setCurrentPageOrders]);

  return (
    <div className="px-10" aria-label="Order History">
      {errorMessage && (
        <div data-testid="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}
      <Table isStriped aria-label="Order History">
        <TableHeader>
          <TableColumn>
            <ObjectArraySortButton
              sortKey={SortProperties.byProperty("order_id")}
              sortProps={sortProps}
              onSortPropsChange={setSortProps}
              type="19"
              >
              Order ID
            </ObjectArraySortButton>
          </TableColumn>
          <TableColumn>
            <ObjectArraySortButton
              sortKey={SortProperties.byProperty("customer_id")}
              sortProps={sortProps}
              onSortPropsChange={setSortProps}
              type="19"
            >
              Customer ID
            </ObjectArraySortButton>
          </TableColumn>
          <TableColumn>
            <ObjectArraySortButton
              sortKey={SortProperties.byProperty("placed_time")}
              sortProps={sortProps}
              onSortPropsChange={setSortProps}
            >
              Order Date
            </ObjectArraySortButton>
          </TableColumn>
          <TableColumn>
            <ObjectArraySortButton>
              Status
            </ObjectArraySortButton>
          </TableColumn>
          <TableColumn>
            <ObjectArraySortButton
              sortKey={SortProperties.byProperty("total")}
              sortProps={sortProps}
              onSortPropsChange={setSortProps}
              type="19"
            >
              Order Total
            </ObjectArraySortButton>
          </TableColumn>
          <TableColumn>Actions</TableColumn>
          {/* Add more columns as needed */}
        </TableHeader>
        <TableBody aria-label="Order History">
          {currentPageOrders.map(order => (
            <TableRow key={order.order_id} aria-label="Order">
              <TableCell aria-label="Order ID">{order.order_id}</TableCell>
              <TableCell aria-label="Customer ID">{order.customer_id}</TableCell>
              <TableCell aria-label="Order Date">{new Date(order.placed_time).toString()}</TableCell>
              <TableCell>
              <div>
                <Select
                  aria-label="Status"
                  size="xs"
                  placeholder={order.order_status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                >
                  <SelectItem key="Pending">Pending</SelectItem>
                  <SelectItem key="Fulfilled">Fulfilled</SelectItem>
                  <SelectItem key="Cancelled">Cancelled</SelectItem>
                </Select>
              </div>
            </TableCell>
              <TableCell aria-label="Order Total">${order.total}</TableCell>
              <TableCell aria-label="Actions">
                <Button isIconOnly auto color="danger" variant="light" size="sm" ghost onClick={() => handleDelete(order.order_id)} data-testid={`delete-${order.order_id}`} aria-label="Delete Order">
                  <FaTrashCan />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <center aria-label="Pagination">
        <ListPagination
          numItems={orders.length}
          itemsPerPage={ORDERS_PER_PAGE}
          setStartIndex={setStartIndex}
          aria-label="Pagination"
        />
      </center>
    </div>
  );
};

export default OrderHistory;