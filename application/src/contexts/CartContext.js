import {createContext, useEffect, useState} from "react";
import {useDisclosure} from "@nextui-org/react";
import OrderPanel from "@/components/orders/OrderPanel";

const CartContext = createContext([]);
export default CartContext;

export function CartContextProvider({children}) {
  const [cartItems, setCartItems] = useState([]);
  const [aggregatedCartItems, setAggregatedCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // recalculate cart quantities & total when cart is modified
  useEffect(() => {
    setAggregatedCartItems(cartItems.reduce((acc, item) => {
      const itemName = item.name;
      if (acc[itemName]) {
        acc[itemName].quantity += 1;
        acc[itemName].totalPrice = acc[itemName].quantity * parseFloat(item.price);
      } else {
        acc[itemName] = { ...item, quantity: 1, totalPrice: parseFloat(item.price) };
      }
      return acc;
    }, []));
    setCartTotal(cartItems.reduce((total, item) => total + item.price, 0));
  }, [cartItems, setAggregatedCartItems, setCartTotal]);

  const addItemToCart = (item) => {
    const newCartItems = cartItems.slice();
    newCartItems.push(item);
    setCartItems(newCartItems);
    setIsCartOpen(true);
  };

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter(({name}) => name !== item.name);
    setCartItems(newCartItems);
  }

  return (
    <CartContext.Provider value={{cartItems, addItemToCart, isCartOpen, setIsCartOpen}}>
      {children}
      <OrderPanel cart={cartItems} setCart={setCartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartContext.Provider>
  )
}
