import React, { useState, useEffect } from 'react';
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import ListPagination from "@/components/utils/ListPagination";
import {FaTrashCan} from "react-icons/fa6";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import useSortedArray, {SortProperties} from "@/react-hooks/useSortedArray";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";

const ORDERS_PER_PAGE = 20;

const OrderHistory = () => {
  const [orders, refreshOrders] = useApiFetch('/api/orders/viewOrders', []);
  const [sortedOrders, sortProps, setSortProps] = useSortedArray(orders, SortProperties.byProperty("placed_time", "desc"));
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);

  //HANDLE DELETE
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/deleteOrder?orderId=${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      refreshOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
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
    <div className="px-10">
      <Table isStriped>
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
        <TableBody>
          {currentPageOrders.map(order => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell>{new Date(order.placed_time).toString()}</TableCell>
              <TableCell>Fulfilled</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
              <Button isIconOnly auto color="danger" variant="light" size="sm" ghost onClick={() => handleDelete(order.order_id)}>
                <FaTrashCan />
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <center>
        <ListPagination
          numItems={orders.length}
          itemsPerPage={ORDERS_PER_PAGE}
          setStartIndex={setStartIndex}
        />
      </center>
    </div>
  );
};

export default OrderHistory;
