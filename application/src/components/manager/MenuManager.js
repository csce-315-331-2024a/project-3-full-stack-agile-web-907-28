import MenuItemEditor from "@/components/manager/MenuItemEditor";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody, TableCell,
  TableColumn,
  TableHeader,
  TableRow, Tooltip
} from "@nextui-org/react";
import ListPagination from "@/components/utils/ListPagination";
import {FaPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import {FaPencil, FaTrashCan} from "react-icons/fa6";

import menuCategories from "@/models/menuCategories";
import InventoryItem from "@/models/InventoryItem";
import axios from "axios";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import MenuItem from "@/models/MenuItem";
import useObjectArraySorter from "@/components/utils/useObjectArraySorter";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";

const MENU_ITEMS_PER_PAGE = 10;


/**
 * Component which displays menu items & allows editing of both the list and each individual item.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [databaseChanged, setDatabaseChanged] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageMenuItems, setCurrentPageMenuItems] = useState([]);
  const [sortProps, setSortProps] = useObjectArraySorter(menuItems, setMenuItems, "menuItemId");

  useEffect(() => {
    fetch("/api/menu/menuitems")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setMenuItems(data.map(MenuItem.parseJson));
        setDatabaseChanged(false);
        setSortProps({key: sortProps.key, order: sortProps.order, enable: true});
      })
      .catch(error => console.error("Failed to fetch menu items:", error));
  }, [databaseChanged, setDatabaseChanged, setSortProps, sortProps.key, sortProps.order]);

  useEffect(() => {
    fetch("/api/inventory/getInventoryItems")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(setInventoryItems)
      .catch(error => console.error("Failed to fetch inventory items:", error));
  }, [databaseChanged, setDatabaseChanged]);

  useEffect(() => {
    setCurrentPageMenuItems(menuItems
      .slice(startIndex, startIndex + MENU_ITEMS_PER_PAGE));
  }, [menuItems, startIndex, setCurrentPageMenuItems]);

  const handleCreate = (item) => (
    axios.post("/api/menu/createMenuItem", { menuItem: item })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(data => {
        console.log("Created menu item:", MenuItem.parseJson(data));
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error creating menu item:", e);
      })
  );
  const handleEdit = (item) => (
    axios.post("/api/menu/updateMenuItem", { menuItem: item })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(data => {
        console.log("Updated menu item:", MenuItem.parseJson(data));
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error updating menu item:", e);
      })
  );
  const handleDelete = (item) => (
    axios.post("/api/menu/deleteMenuItem", { id: item.menuItemId })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          throw res;
        }
      })
      .then(_ => {
        console.log("Deleted menu item:", item);
        setDatabaseChanged(true);
      })
      .catch(e => {
        console.error("Error deleting menu item:", e);
      })
  );

  return (
    <>
      <Card fullWidth="true" radius="none" shadow="none" className="px-9">
        <CardHeader className="justify-end">
          <MenuItemEditor
            trigger={onOpen => (
              <Button
                color="primary"
                onClick={onOpen}
                startContent={<FaPlus/>}
              >
                Create menu item
              </Button>
            )}
            onMenuItemChange={handleCreate}
            inventoryItems={inventoryItems}
          />
        </CardHeader>
        <CardBody>
          <Table isStriped>
            <TableHeader>
              <TableColumn>
                <ObjectArraySortButton
                  prop="menuItemId"
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  ID
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  prop="name"
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="az"
                >
                  Name
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  prop="price"
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  Price
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  prop="categoryId"
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="plain"
                >
                  Category
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>Seasonal Dates</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {currentPageMenuItems.map(menuItem => (
                <TableRow key={menuItem.menuItemId}>
                  <TableCell>{menuItem.menuItemId}</TableCell>
                  <TableCell>{menuItem.name}</TableCell>
                  <TableCell>{"$" + menuItem.price.toFixed(2)}</TableCell>
                  <TableCell>{
                    menuCategories.some(({id}) => id === menuItem.categoryId) ? (
                      menuCategories.find(({id}) => id === menuItem.categoryId).name
                    ) : (
                      menuItem.categoryId
                    )
                  }</TableCell>
                  {
                    menuItem.seasonal ? (
                      <TableCell>{menuItem.startDate.toString().slice(0,10)} - {menuItem.endDate.toString().slice(0,10)}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )
                  }
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <MenuItemEditor
                        trigger={onOpen => (
                          <Button aria-label="Edit" isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil/></Button>
                        )}
                        onMenuItemChange={handleEdit}
                        menuItem={menuItem}
                        inventoryItems={inventoryItems}
                      />
                      <ConfirmationDialog
                        trigger={onOpen => (
                          <Button aria-label="Delete" color="danger" isIconOnly onClick={onOpen} size="sm" variant="light"><FaTrashCan/></Button>
                        )}
                        onConfirm={() => {
                          handleDelete(menuItem)
                        }}
                        body="Are you sure you want to delete this menu item?"
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
          numItems={menuItems.length}
          itemsPerPage={MENU_ITEMS_PER_PAGE}
          setStartIndex={setStartIndex}
        />
      </div>
    </>
)
}