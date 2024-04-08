import {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow, Tooltip
} from "@nextui-org/react";
import ListPagination from "@/components/utils/ListPagination";
import InventoryItemEditor from "@/components/manager/InventoryItemEditor";
import {FaPencil, FaTrashCan} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";

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
    <Card fullWidth="true" radius="none" shadow="none" className="px-9">
      <CardHeader className="justify-end">
        <InventoryItemEditor onInventoryItemChange={(_) => {}}>
          {onOpen => (
            <Button
              color="primary"
              onClick={onOpen}
              startContent={<FaPlus />}
            >
              Create inventory item
            </Button>
          )}
        </InventoryItemEditor>
      </CardHeader>
      <CardBody>
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
                <TableCell>{item.purchaseDate.toString().slice(0,10)}</TableCell>
                <TableCell>{item.expiryDate.toString().slice(0,10)}</TableCell>
                <TableCell>{item.quantityLimit}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <InventoryItemEditor inventoryItem={item} onInventoryItemChange={(_) => {}}>
                      {onOpen => (
                        <Tooltip content="Edit">
                          <Button isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil /></Button>
                        </Tooltip>
                      )}
                    </InventoryItemEditor>
                    <Tooltip content="Delete">
                      <Button color="danger" isIconOnly size="sm" variant="light"><FaTrashCan /></Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <div className="p-4">
        <ListPagination
          numItems={inventory_items.length}
          itemsPerPage={INVENTORY_ITEMS_PER_PAGE}
          setStartIndex={setStartIndex}
        />
      </div>
    </Card>
  )
}