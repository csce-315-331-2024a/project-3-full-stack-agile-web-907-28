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

const MENU_ITEMS_PER_PAGE = 15;


export default function MenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch("/api/menu/menuitems")
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
      })
      .catch(error => console.error("Failed to fetch menu items:", error));
  }, []);

  const currentPageMenuItems = menuItems.slice(startIndex, startIndex + MENU_ITEMS_PER_PAGE);

  return (
    <>
      <Card fullWidth="true" radius="none" shadow="none" className="px-9">
        <CardHeader className="justify-end">
          <MenuItemEditor onMenuItemChange={(_) => {}}>
            {onOpen => (
              <Button
                color="primary"
                onClick={onOpen}
                startContent={<FaPlus/>}
              >
                Create menu item
              </Button>
            )}
          </MenuItemEditor>
        </CardHeader>
        <CardBody>
          <Table isStriped>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Seasonal Dates</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {currentPageMenuItems.map(menuItem => (
                <TableRow key={menuItem.menuItemId}>
                  <TableCell>{menuItem.menuItemId}</TableCell>
                  <TableCell>{menuItem.name}</TableCell>
                  <TableCell>${menuItem.price}</TableCell>
                  <TableCell>{menuItem.categoryId}</TableCell>
                  {
                    menuItem.seasonal ? (
                      <TableCell>{menuItem.startDate.toString().slice(0,10)} - {menuItem.endDate.toString().slice(0,10)}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )
                  }
                  <TableCell>
                    <MenuItemEditor menuItem={menuItem} onMenuItemChange={(_) => {}}>
                      {onOpen => (
                        <Tooltip content="Edit">
                          <Button isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil/></Button>
                        </Tooltip>
                      )}
                    </MenuItemEditor>
                    <Tooltip content="Delete">
                      <Button color="danger" isIconOnly size="sm" variant="light"><FaTrashCan/></Button>
                    </Tooltip>
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