import {useContext, useEffect, useState} from "react";
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
import {FaArrowDown19, FaArrowDownAZ, FaArrowUp19, FaArrowUpAZ, FaPencil, FaTrashCan} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";
import InventoryItem from "@/models/InventoryItem";
import axios from "axios";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import useSortedArray, {SortProperties} from "@/react-hooks/useSortedArray";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";
import InventoryContext from "@/contexts/InventoryContext";

const INVENTORY_ITEMS_PER_PAGE = 15;


/**
 * Component which displays inventory items & allows editing of both the list and each individual item.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InventoryManager() {
  const {inventoryItems, refreshInventoryItems} = useContext(InventoryContext);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageInventoryItems, setCurrentPageInventoryItems] = useState([]);
  const [sortedInventoryItems, sortProps, setSortProps] = useSortedArray(inventoryItems, SortProperties.byProperty("inventoryItemId"));

  // When the array is refreshed or resorted, go back to the first page.
  useEffect(() => {
    setStartIndex(0);
  }, [sortedInventoryItems]);

  // Only display the menu items on the current page.
  useEffect(() => {
    setCurrentPageInventoryItems(sortedInventoryItems
      .slice(startIndex, startIndex + INVENTORY_ITEMS_PER_PAGE));
  }, [sortedInventoryItems, startIndex, setCurrentPageInventoryItems]);

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
        refreshInventoryItems();
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
        refreshInventoryItems();
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
        refreshInventoryItems();
      })
      .catch(e => {
        console.error("Error deleting inventory item:", e);
      })
  );

  return (
    <>
      <Card fullWidth="true" radius="none" shadow="none" className="px-9">
        <CardHeader className="justify-end">
          <InventoryItemEditor
            trigger={onOpen => (
              <Button
                color="primary"
                onClick={onOpen}
                startContent={<FaPlus/>}
              >
                Create inventory item
              </Button>
            )}
            onInventoryItemChange={handleCreate}
          />
        </CardHeader>
        <CardBody>
          <Table isStriped aria-label="Inventory management table">
            <TableHeader>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("inventoryItemId")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  ID
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("name")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="az"
                >
                  Name
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("quantity")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  Quantity
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("purchaseDate")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="plain"
                >
                  Purchase Date
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("expiryDate")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="plain"
                >
                  Expiry Date
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("quantityLimit")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  Quantity Limit
                </ObjectArraySortButton>
              </TableColumn>
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
                      <InventoryItemEditor
                        trigger={onOpen => (
                          <Button aria-label="Edit" isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil/></Button>
                        )}
                        onInventoryItemChange={handleEdit}
                        inventoryItem={item}
                        inventoryItems={inventoryItems}
                      />
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