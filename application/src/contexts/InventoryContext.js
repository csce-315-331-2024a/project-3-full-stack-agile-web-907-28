import {createContext, useEffect, useState} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import useSortedArray from "@/react-hooks/useSortedArray";
import InventoryItem from "@/models/InventoryItem";

const InventoryContext = createContext([]);
export default InventoryContext;

/**
 * This context provider is for the inventory. It uses the nextui-org library for the disclosure.
 * @param {JSX.Element} children - The children of the context provider.
 * @returns {JSX.Element} - The inventory context provider.
 */
export function InventoryContextProvider({children}) {
  const [inventoryItems, refreshInventoryItems] = useApiFetch("/api/inventory/getInventoryItems", [], items => items.map(InventoryItem.parseJson));


  return (
    <InventoryContext.Provider value={{inventoryItems, refreshInventoryItems}}>
      {children}
    </InventoryContext.Provider>
  )
}
