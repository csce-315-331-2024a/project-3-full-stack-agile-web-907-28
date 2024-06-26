import {
  Autocomplete, AutocompleteItem, Button, Input,
  Modal, ModalBody,
  ModalContent, ModalFooter,
  ModalHeader, Select,
  Table,
  TableBody, TableCell,
  TableColumn,
  TableHeader, TableRow,
  useDisclosure
} from "@nextui-org/react";
import {useContext, useEffect, useState} from "react";
import MenuContext from "@/contexts/MenuContext";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import {FaTrashCan} from "react-icons/fa6";


/**
 * This component creates a Modal which allows order contents to be edited.
 * @param trigger {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param onOrderChange Callback function for submitting the new/modified order.
 * @param order {Object | null} (optional) The order to edit.
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderEditor({trigger, onOrderChange, order}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {menuItems} = useContext(MenuContext);

  const [menuItemIds, setMenuItemIds] = useState(order.menuitem_ids);
  const [error, setError] = useState("");

  /**
   * This function aggregates the quantities of each menu item in the order.
   * @param {Array} ids - The array of menu item IDs.
   * @returns {Object} - An object where the keys are the menu item IDs and the values are the quantities.
   */
  const aggregateCartQuantities = (ids) => {
    let quantities = {};
    for (const id of ids) {
      if (quantities[id]) {
        quantities[id] += 1;
      } else {
        quantities[id] = 1;
      }
    }
    return quantities;
  }
  const [aggregatedCart, setAggregatedCart] = useState(aggregateCartQuantities(order.menuitem_ids));
  useEffect(() => {
    setAggregatedCart(aggregateCartQuantities(menuItemIds));
  }, [menuItemIds]);

  /**
   * This function changes the quantity of a menu item in the order.
   * @param {number} item_id - The ID of the menu item.
   * @param {number} newQuantity - The new quantity of the menu item.
   */
  const changeItemQuantity = (item_id, newQuantity) => {
    console.log(item_id, newQuantity);
    let newMenuItemIds = menuItemIds.filter(id => id !== item_id);
    console.log(newMenuItemIds);
    for (let i = 0; i < newQuantity; i++) {
      newMenuItemIds.push(item_id);
    }
    console.log(newMenuItemIds);
    setMenuItemIds(newMenuItemIds);
  }

  /**
   * This function handles the opening of the Modal. It sets the menuItemIds state to the menuitem_ids of the order.
   */
  const handleOpen = () => {
    setMenuItemIds(order.menuitem_ids);
    setError("");
    onOpen();
  };

  /**
   * This function handles the submission of the form. It sets the menuItemIds state to the menuitem_ids of the order.
   * @param {function} onClose - The function to close the Modal.
   */
  const handleSubmit = (onClose) => {
    try {
      let newOrder = {...order};
      newOrder.menuitem_ids = menuItemIds;
      newOrder.total = Object.keys(aggregatedCart).reduce((acc, item_id) => {
        const menuItem = menuItems.find(item => item.menuItemId === parseFloat(item_id));
        return acc + aggregatedCart[item_id] * menuItem.price;
      }, 0.00).toFixed(2);

      onOrderChange(newOrder);
      setError("");
      onClose();
    } catch (e) {
      setError(e);
    } finally {

    }
  };

  return (
    <>
      {trigger(handleOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="3xl">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>Edit Order</ModalHeader>
              <ModalBody>
                <Table aria-label="Order items" isStriped>
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Quantity</TableColumn>
                    <TableColumn>Unit Price</TableColumn>
                    <TableColumn>Total Price</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {
                      Object.keys(aggregatedCart).map((item_id) => {
                        const item_id_num = parseFloat(item_id);
                        const menuItem = menuItems.find(item => item.menuItemId === item_id_num);
                        return (
                          <TableRow key={item_id}>
                            <TableCell>{menuItem.name}</TableCell>
                            <TableCell>
                              <Input type="number" value={aggregatedCart[item_id]} onValueChange={newQuantity => changeItemQuantity(item_id_num, newQuantity)} />
                            </TableCell>
                            <TableCell>${menuItem.price}</TableCell>
                            <TableCell>${menuItem.price * aggregatedCart[item_id]}</TableCell>
                            <TableCell>
                              <ConfirmationDialog
                                trigger={onOpen => (
                                  <Button color="danger" isIconOnly onClick={onOpen} size="sm" variant="light"><FaTrashCan /></Button>
                                )}
                                onConfirm={() => changeItemQuantity(item_id_num, 0)}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                    <TableRow key="New Item">
                      <TableCell>
                        <Autocomplete placeholder="Add item" value="" onSelectionChange={id => changeItemQuantity(parseFloat(id), 1)}>
                          {
                            menuItems.filter(({menuItemId}) => !aggregatedCart[menuItemId]).map(menuItem => (
                              <AutocompleteItem key={menuItem.menuItemId} value={menuItem.menuItemId}>{menuItem.name}</AutocompleteItem>
                            ))
                          }
                        </Autocomplete>
                      </TableCell>
                      <TableCell><></></TableCell>
                      <TableCell><></></TableCell>
                      <TableCell><></></TableCell>
                      <TableCell><></></TableCell>
                    </TableRow>
                    <TableRow key="Order Total">
                      <TableCell className="font-semibold">Order Total</TableCell>
                      <TableCell><></></TableCell>
                      <TableCell><></></TableCell>
                      <TableCell>${
                        Object.keys(aggregatedCart).reduce((acc, item_id) => {
                          const menuItem = menuItems.find(item => item.menuItemId === parseFloat(item_id));
                          return acc + aggregatedCart[item_id] * menuItem.price;
                        }, 0.00).toFixed(2)
                      }</TableCell>
                      <TableCell><></></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                {
                  error === "" ? (
                    <></>
                  ) : (
                    <p className="error">{error}</p>
                  )
                }
                <Button onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={() => handleSubmit(onClose)}>Submit</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
