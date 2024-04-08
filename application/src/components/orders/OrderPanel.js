import React from 'react';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import styles from '../../styles/OrderPanel.module.css';
import { useState, useCallback } from 'react';

const OrderPanel = ({ cart, setCart, isOpen, onClose }) => {
  const [submitting, setSubmitting] = useState(false); // To handle button state during submission

  if (!isOpen) return null;

  // Aggregate cart items by name and calculate total price and count
  const aggregatedCart = cart.reduce((acc, item) => {
    const itemName = item.name;
    if (acc[itemName]) {
      acc[itemName].quantity += 1;
      acc[itemName].totalPrice = acc[itemName].quantity * parseFloat(item.price);
    } else {
      acc[itemName] = { ...item, quantity: 1, totalPrice: parseFloat(item.price) };
    }
    return acc;
  }, {});

  const totalCost = Object.values(aggregatedCart).reduce((total, item) => total + item.totalPrice, 0);

  const handleSubmitOrder = async () => {
    setSubmitting(true);

    console.log(Object.values(aggregatedCart).map(item => item.menuItemId));

    //Print aggregatedCart
    console.log(aggregatedCart);

    const orderData = {
      customer_id: '1',
      employee_id: '10',
      menuitem_ids: Object.values(aggregatedCart).map(item => item.menuItemId), // Assuming item.id is available
      total: totalCost.toFixed(2)
    };

    try {
      const response = await fetch('/api/orders/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      console.log('Order submitted:', data);
      setCart([]); // Clear the cart after successful submission
      onClose(); // Close the order panel upon successful submission
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveItem = (itemName) => {
    setCart(currentCart => currentCart.filter(item => item.name !== itemName));
  };

  return (
    <div className={styles.orderPanel}>
    <div className={styles.orderPanelHeader}>
      <h3>Card</h3>
      <Button auto flat color="error" onClick={onClose}>
        Close
      </Button>
    </div>
    <Table css={{ maxHeight: "400px", overflow: "auto" }} aria-label="Order Details">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Price Each</TableColumn>
          <TableColumn>Total Price</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.values(aggregatedCart).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${parseFloat(item.price).toFixed(2)}</TableCell>
              <TableCell>${parseFloat(item.totalPrice).toFixed(2)}</TableCell>
              <TableCell>
                <Button auto color="error" onClick={() => handleRemoveItem(item.name)} ghost>
                  ❌
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.orderTotalSubmit}>
        <div className={styles.orderTotal}>Total Cost: ${totalCost.toFixed(2)}</div>
        <Button auto disabled={submitting} onClick={handleSubmitOrder}>
          {submitting ? 'Submitting...' : 'Submit Order'}
        </Button>
      </div>
    </div>
  );
};

export default OrderPanel;
