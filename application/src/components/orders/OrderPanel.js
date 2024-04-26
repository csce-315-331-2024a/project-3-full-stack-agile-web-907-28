import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, RadioGroup, Radio} from "@nextui-org/react";
import styles from '../../styles/OrderPanel.module.css';
import { useContext, useState, useEffect } from 'react';
import CartContext from "@/contexts/CartContext";
import {FaTrashCan} from "react-icons/fa6";
import {useSession} from "next-auth/react";
import getUserCredentials from "../security/getUserCredentials"
/**
 * This component is the order panel for the cashier. It uses the nextui-org library for the table and buttons.
 * @param {function} onClose - The function to close the order panel.
 * @returns {JSX.Element} - The order panel.
 */
const OrderPanel = ({ onClose }) => {
  const {aggregatedCartItems, cartTotal, isCartOpen, isCartSubmitting, changeItemQuantity, removeItemFromCart, submitOrder, insufficientStock, customerName, setCustomerName, paymentType, setPaymentType} = useContext(CartContext);


  //Get current user credentials, if it is customer then set the customerName
  useEffect(() => {
    if (isCartOpen) {
      console.log("Checking if a customer exists");
      const userCredentials = getUserCredentials();
      if (userCredentials.role === "Customer") {
        console.log("Customer exists");
        setCustomerName(userCredentials.name);
      }
    }
  }, [isCartOpen]);


  return (
    isCartOpen ? (
      <>
        <div className={styles.orderPanel}>
          <div className={styles.orderPanelHeader}>
            <h3>Card</h3>
            <Button auto flat color="error" onClick={onClose}>
              Close
            </Button>
          </div>
          <Table css={{maxHeight: "400px", overflow: "auto"}} aria-label="Order Details">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Price Each</TableColumn>
              <TableColumn>Total Price</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {Object.values(aggregatedCartItems).map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Input aria-label="amount" type="number" value={item.quantity} onValueChange={(newQuantity) => changeItemQuantity(item, newQuantity)} />
                  </TableCell>
                  <TableCell>${parseFloat(item.price).toFixed(2)}</TableCell>
                  <TableCell>${parseFloat(item.totalPrice).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button auto isIconOnly color="danger" size="sm" variant="light" onClick={() => removeItemFromCart(item)} ghost>
                      <FaTrashCan />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/*Create a div that will hold an input for the customer name as well as a radio button for type of payment*/}
          <div>
            <div>
              <Input
                label="Customer Name"
                isRequired
                type="text"
                value={customerName}
                placeholder={customerName || "Enter customer name"}
                onChange={(e) => setCustomerName(e.target.value)}
            />
              <RadioGroup
                label="Select Payment Method"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <Radio value="cash">Cash</Radio>
                <Radio value="credit">Credit</Radio>
                <Radio value="debit">Debit</Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.orderTotalSubmit}>
            <div className={styles.orderTotal}>Total Cost: ${cartTotal.toFixed(2)}</div>
            {
              insufficientStock ? (
                <Button disabled={true} color="danger">
                  Out of stock
                </Button>
              ) : (
                <Button disabled={isCartSubmitting} onClick={submitOrder}>
                  {isCartSubmitting ? 'Submitting...' : 'Submit Order'}
                </Button>

              )
            }
          </div>

        </div>
      </>
    ) : (
      <></>
  )
  );
};

export default OrderPanel;
