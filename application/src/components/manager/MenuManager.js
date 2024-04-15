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
import {useContext, useEffect, useState} from "react";
import {FaPencil, FaTrashCan} from "react-icons/fa6";

import menuCategories from "@/models/menuCategories";
import axios from "axios";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import MenuItem from "@/models/MenuItem";
import useSortedArray, {SortProperties} from "@/react-hooks/useSortedArray";
import ObjectArraySortButton from "@/components/utils/ObjectArraySortButton";
import MenuContext from "@/contexts/MenuContext";
import InventoryContext from "@/contexts/InventoryContext";

const MENU_ITEMS_PER_PAGE = 15;


/**
 * Component which displays menu items & allows editing of both the list and each individual item.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MenuManager() {
  const {menuItems, refreshMenuItems} = useContext(MenuContext);
  const {inventoryItems} = useContext(InventoryContext);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPageMenuItems, setCurrentPageMenuItems] = useState([]);
  const [sortedMenuItems, sortProps, setSortProps] = useSortedArray(menuItems, SortProperties.byProperty("menuItemId"));

  // When the array is refreshed or resorted, go back to the first page.
  useEffect(() => {
    setStartIndex(0);
  }, [sortedMenuItems]);

  // Only display the menu items on the current page.
  useEffect(() => {
    setCurrentPageMenuItems(sortedMenuItems
      .slice(startIndex, startIndex + MENU_ITEMS_PER_PAGE));
  }, [sortedMenuItems, startIndex, setCurrentPageMenuItems]);

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
        refreshMenuItems();
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
        refreshMenuItems();
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
        refreshMenuItems();
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
                  sortKey={SortProperties.byProperty("menuItemId")}
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
                  sortKey={SortProperties.byProperty("price")}
                  sortProps={sortProps}
                  onSortPropsChange={setSortProps}
                  type="19"
                >
                  Price
                </ObjectArraySortButton>
              </TableColumn>
              <TableColumn>
                <ObjectArraySortButton
                  sortKey={SortProperties.byProperty("categoryId")}
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
                      <TableCell>{menuItem.startDate.toDateString()} - {menuItem.endDate.toDateString()}</TableCell>
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