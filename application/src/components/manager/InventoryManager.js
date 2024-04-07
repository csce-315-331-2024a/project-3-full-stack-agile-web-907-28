import {useEffect, useState} from "react";
import {Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import ListPagination from "@/components/utils/ListPagination";

const INVENTORY_ITEMS_PER_PAGE = 15;

export default function InventoryManager() {
  const [inventory_items, setInventoryItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch("/api/inventory/getInventoryItems")
      .then(res => res.json())
      .then(data => {
        setInventoryItems(data);
      })
      .catch(error => console.error("Failed to fetch inventory items:", error));
  }, []);

  const currentPageInventoryItems = inventory_items.slice(startIndex, startIndex + INVENTORY_ITEMS_PER_PAGE);

  return (
    <div className="px-10">
      <Table isStriped>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Purchase Date</TableColumn>
          <TableColumn>Expiry Date</TableColumn>
          <TableColumn>Quantity Limit</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {currentPageInventoryItems.map(item => (
            <TableRow key={item.inventoryItemId}>
              <TableCell>{item.inventoryItemId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.purchaseDate}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.quantityLimit}</TableCell>
              <TableCell>
                <div></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ListPagination
        numItems={inventory_items.length}
        itemsPerPage={INVENTORY_ITEMS_PER_PAGE}
        setStartIndex={setStartIndex}
      />
    </div>
  )
}