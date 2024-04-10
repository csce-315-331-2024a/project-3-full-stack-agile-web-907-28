import {createContext, useEffect, useState} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import useSortedArray from "@/react-hooks/useSortedArray";
import InventoryItem from "@/models/InventoryItem";

const InventoryContext = createContext([]);
export default InventoryContext;

export function InventoryContextProvider({children}) {
  const [inventoryItems, refreshInventoryItems] = useApiFetch("/api/inventory/getInventoryItems", [], items => items.map(InventoryItem.parseJson));


  return (
    <InventoryContext.Provider value={{inventoryItems, refreshInventoryItems}}>
      {children}
    </InventoryContext.Provider>
  )
}
