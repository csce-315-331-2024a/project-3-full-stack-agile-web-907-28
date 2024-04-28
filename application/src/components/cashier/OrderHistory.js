import React, { useState, useEffect } from 'react';
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem } from '@nextui-org/react';
import ListPagination from "@/components/utils/ListPagination";
import {FaPencil, FaTrashCan} from "react-icons/fa6";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import useSortedArray, {SortProperties} from "@/react-hooks/useSortedArray";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import OrderEditor from "@/components/cashier/OrderEditor";
import { useContext } from "react";
import CustomerContext from "@/contexts/CustomerContext";

const ORDERS_PER_PAGE = 20;

/**
 * This component is the order history page for the cashier. It uses the nextui-org library for the table and pagination.
 * @returns {JSX.Element} - The order history page.
 */
const OrderHistory = () => {
  const {customers, refreshCustomers} = useContext(CustomerContext);
  const [orders, refreshOrders] = useApiFetch('/api/orders/viewOrders', []);
  const [sortedOrders, sortProps, setSortProps] = useSortedArray(orders, SortProperties.byProperty("placed_time", "desc"));
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message


  /**
   * This function handles the status change of an order. It sends a POST request to the /api/orders/changeStatus endpoint with the order_id and order_status.
   * @param {number} orderId - The ID of the order.
   * @param {string} newStatus - The new status of the order.
   * @returns {Promise<void>} - A Promise that resolves when the request is successful.
   */
  const handleStatusChange = async (orderId, newStatus) => {
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

  /**
   * This function handles the edit of an order. It sends a POST request to the /api/orders/updateOrder endpoint with the newOrder.
   * @param {Object} newOrder - The new order.
   * @returns {Promise<void>} - A Promise that resolves when the request is successful.
   */
  const handleEditOrder = async (newOrder) => {
    try {
      const response = await fetch('/api/orders/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder)
      });
      refreshOrders();
    } catch (e) {
      console.error(e);
      setErrorMessage(error.message);
    }
  }

  /**
   * This function handles the deletion of an order. It sends a DELETE request to the /api/orders/deleteOrder endpoint with the orderId.
   * @param {number} orderId - The ID of the order.
   * @returns {Promise<void>} - A Promise that resolves when the request is successful.
   */
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
              Customer Name
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
        </TableHeader>
        <TableBody aria-label="Order History">
          {currentPageOrders.map(order => (
            <TableRow key={order.order_id} aria-label="Order">
              <TableCell aria-label="Order ID">{order.order_id}</TableCell>
              <TableCell aria-label="Customer Name">{order.customer_name}</TableCell>
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
                <OrderEditor
                  trigger={onOpen => (
                    <Button aria-label="Edit" isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil/></Button>
                  )}
                  order={order}
                  onOrderChange={handleEditOrder}
                />
                <ConfirmationDialog
                  trigger = {(onOpen) => (
                    <Button aria-label="Delete" color="danger" isIconOnly size="sm" variant="light" onClick={onOpen}><FaTrashCan/></Button>
                  )}
                  onConfirm={() => {
                    handleDelete(order.order_id);
                  }}
                  body="Are you sure you want to delete this order?"
                />
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