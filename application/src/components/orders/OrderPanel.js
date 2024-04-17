import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import styles from '../../styles/OrderPanel.module.css';
import { useContext } from 'react';
import CartContext from "@/contexts/CartContext";
import {FaTrashCan} from "react-icons/fa6";

/**
 * This component is the order panel for the cashier. It uses the nextui-org library for the table and buttons.
 * @param {function} onClose - The function to close the order panel.
 * @returns {JSX.Element} - The order panel.
 */
const OrderPanel = ({ onClose }) => {
  const {aggregatedCartItems, cartTotal, isCartOpen, isCartSubmitting, removeItemFromCart, submitOrder} = useContext(CartContext);

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
                  <TableCell>{item.quantity}</TableCell>
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
          <div className={styles.orderTotalSubmit}>
            <div className={styles.orderTotal}>Total Cost: ${cartTotal.toFixed(2)}</div>
            <Button auto disabled={isCartSubmitting} onClick={submitOrder}>
              {isCartSubmitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          </div>
        </div>
      </>
    ) : (
      <></>
  )
  );
};

export default OrderPanel;
