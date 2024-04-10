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
import InventoryItem from "@/models/InventoryItem";
import axios from "axios";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";

const INVENTORY_ITEMS_PER_PAGE = 15;

export default function InventoryManager() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [databaseChanged, setDatabaseChanged] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageInventoryItems, setCurrentPageInventoryItems] = useState([]);


  useEffect(() => {
    fetch("/api/inventory/getInventoryItems")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setInventoryItems(data.map(InventoryItem.parseJson));
        setDatabaseChanged(false);
      })
      .catch(error => console.error("Failed to fetch inventory items:", error));
  }, [databaseChanged, setDatabaseChanged]);

  useEffect(() => {
    setCurrentPageInventoryItems(inventoryItems
      .slice(startIndex, startIndex + INVENTORY_ITEMS_PER_PAGE));
  }, [inventoryItems, startIndex, setCurrentPageInventoryItems]);

  const handleCreate = (item) => (
    axios.post("/api/inventory/createInventoryItem", { inventoryItem: item })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(data => {
        console.log("Created inventory item:", InventoryItem.parseJson(data));
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error creating inventory item:", e);
      })
  );
  const handleEdit = (item) => (
    axios.post("/api/inventory/updateInventoryItem", { inventoryItem: item })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(data => {
        console.log("Updated inventory item:", data);
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error updating inventory item:", e);
      })
  );
  const handleDelete = (item) => (
    axios.post("/api/inventory/deleteInventoryItem", { id: item.inventoryItemId })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(_ => {
        console.log("Deleted inventory item:", item);
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error deleting inventory item:", e);
      })
  );

  return (
    <>
      <Card fullWidth="true" radius="none" shadow="none" className="px-9">
        <CardHeader className="justify-end">
          <InventoryItemEditor onInventoryItemChange={handleCreate}>
            {onOpen => (
              <Button
                color="primary"
                onClick={onOpen}
                startContent={<FaPlus/>}
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
                  <TableCell>{item.purchaseDate.toDateString()}</TableCell>
                  <TableCell>{item.expiryDate.toDateString()}</TableCell>
                  <TableCell>{item.quantityLimit}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <InventoryItemEditor inventoryItem={item} inventoryItems={inventoryItems} onInventoryItemChange={handleEdit}>
                        {onOpen => (
                          <Button aria-label="Edit" isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil/></Button>
                        )}
                      </InventoryItemEditor>
                      <ConfirmationDialog
                        trigger = {(onOpen) => (
                          <Button aria-label="Delete" color="danger" isIconOnly size="sm" variant="light" onClick={onOpen}><FaTrashCan/></Button>
                        )}
                        onConfirm={() => {
                          handleDelete(item);
                        }}
                        body="Are you sure you want to delete this inventory item?"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <div className="p-4">
        <ListPagination
          numItems={inventoryItems.length}
          itemsPerPage={INVENTORY_ITEMS_PER_PAGE}
          setStartIndex={setStartIndex}
        />
      </div>
    </>
  )
}