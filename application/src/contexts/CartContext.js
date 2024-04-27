import {createContext, useContext, useEffect, useState} from "react";
import {useDisclosure} from "@nextui-org/react";
import OrderPanel from "@/components/orders/OrderPanel";
import InventoryContext from "@/contexts/InventoryContext";
import Customer from "@/models/Customer";
import CustomerContext from "@/contexts/CustomerContext";


const CartContext = createContext([]);
export default CartContext;

/**
 * This context provider is for the cart. It uses the nextui-org library for the disclosure.
 * @param {JSX.Element} children - The children of the context provider.
 * @returns {JSX.Element} - The cart context provider.
 */
export function CartContextProvider({children}) {
  const {inventoryItems} = useContext(InventoryContext);
  const [cartItems, setCartItems] = useState([]);
  const [aggregatedCartItems, setAggregatedCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartSubmitting, setIsCartSubmitting] = useState(false);
  const [cartLock, setCartLock] = useState(false);
  const [insufficientStock, setInsufficientStock] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const {customers, refreshCustomers} = useContext(CustomerContext);


  // recalculate cart quantities & total when cart is modified
  useEffect(() => {
    if (!cartLock) {
      const {items, total} = cartItems.reduce((acc, item) => {
        const itemName = item.name;
        if (acc.items[itemName]) {
          acc.items[itemName].quantity += 1;
          acc.items[itemName].totalPrice = acc.items[itemName].quantity * parseFloat(item.price);
        } else {
          acc.items[itemName] = {...item, quantity: 1, totalPrice: parseFloat(item.price)};
        }
        acc.total += item.price;
        return acc;
      }, {items: {}, total: 0});
      setInsufficientStock(false);
      setAggregatedCartItems(items);
      setCartTotal(total);
    }
  }, [cartItems, cartLock, setAggregatedCartItems, setCartTotal]);

  /**
   * This function handles the opening of the cart. It opens the cart.
   */
  const openCart = () => setIsCartOpen(true);

  /**
   * This function handles the closing of the cart. It closes the cart.
   */
  const closeCart = () => setIsCartOpen(false);

  /**
   * This function handles the addition of an item to the cart. It adds the item to the cartItems state and opens the cart.
   * @param {Object} item - The item to be added to the cart.
   */
  const addItemToCart = (item) => {
    while (isCartSubmitting || cartLock) {}
    setCartLock(true);
    const newCartItems = cartItems.slice();
    newCartItems.push(item);
    setCartItems(newCartItems);
    setIsCartOpen(true);
    setCartLock(false);
  };

  /**
   * This function handles the removal of an item from the cart. It removes the item from the cartItems state and closes the cart if the cartItems state is empty.
   * @param {Object} item - The item to be removed from the cart.
   */
  const removeItemFromCart = (item) => {
    while (isCartSubmitting || cartLock) {}
    setCartLock(true);
    const newCartItems = cartItems.filter(({name}) => name !== item.name);
    setCartItems(newCartItems);
    if (newCartItems.length === 0) {
      setIsCartOpen(false);
    }
    setCartLock(false);
  }

  /**
   * This function handles the changing of the quantity of an item in the cart. It removes the item from the cartItems state and adds the item to the cartItems state the specified number of times.
   * @param {Object} item - The item to be changed in the cart.
   * @param {number} newQuantity - The new quantity of the item.
   */
  const changeItemQuantity = (item, newQuantity) => {
    while (isCartSubmitting || cartLock) {}
    setCartLock(true);
    const newCartItems = cartItems.filter(({name}) => name !== item.name);
    for (let i = 0; i < newQuantity; i++) {
      newCartItems.push(item);
    }
    setCartItems(newCartItems);
    if (newCartItems.length === 0) {
      setIsCartOpen(false);
    }
    setCartLock(false);
  };

  /**
   * This function handles the submission of the order. It creates a new customer and uses that customer's id for the order. It then sends a POST request to the /api/orders/order endpoint with the order data.
   */
  const submitOrder = async () => {
    while (isCartSubmitting || cartLock) {}
    setCartLock(true);
    setIsCartSubmitting(true);

    let inventoryRequirements = Object.values(aggregatedCartItems)
      .map(item => item.inventoryItemIds.map((id, idx) => ({id: id, amount: item.quantity * item.inventoryItemAmounts[idx]})))
      .reduce((acc, inventory_items) => {
        for (const {id, amount} of inventory_items) {
          if (acc[id]) {
            acc[id] += amount;
          } else {
            acc[id] = amount;
          }
        }
        return acc;
      }, {});
    for (const inventoryItemId of Object.keys(inventoryRequirements)) {
      let quantityInStock = inventoryItems.find((item) => item.inventoryItemId === parseFloat(inventoryItemId)).quantity;
      if (quantityInStock < inventoryRequirements[inventoryItemId]) {
        setInsufficientStock(true);
        setIsCartSubmitting(false);
        setCartLock(false);
        return;
      }
    }

    console.log("The menu items are: ", aggregatedCartItems);

    //Create a new customer and use that customer's id for the order

    try {
      const response = await fetch('/api/customer/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: customerName, payment_method: paymentType, payment_number: 1}),
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }

    //Now get the customer id from the database
    const response = await fetch(`/api/customer/getOneCustomer?name=${encodeURIComponent(customerName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    const data = await response.json();
    console.log("Current customer: ", data);
    setCurrentCustomer(data);

    refreshCustomers();

    const orderData = {
      customer_id: data.customer_id,
      employee_id: '10',
      menuitem_ids: Object.values(aggregatedCartItems).flatMap(item => Array(item.quantity).fill(item.menuItemId)),
      total: cartTotal.toFixed(2)
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
      setCartItems([]); // Clear the cart after successful submission
      setIsCartOpen(false); // Close the order panel upon successful submission
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsCartSubmitting(false);
      setCartLock(false);
    }
  };

  return (
    <CartContext.Provider value={{cartItems, aggregatedCartItems, cartTotal, isCartOpen, isCartSubmitting, openCart, closeCart, setIsCartOpen, addItemToCart, changeItemQuantity, removeItemFromCart, submitOrder, insufficientStock, customerName, setCustomerName, paymentType, setPaymentType}}>
      {children}
      <OrderPanel cart={cartItems} setCart={setCartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartContext.Provider>
  )
}
