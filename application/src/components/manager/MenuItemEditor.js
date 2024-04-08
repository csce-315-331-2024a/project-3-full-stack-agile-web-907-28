import {
  Button, Card, CardBody, CardFooter, CardHeader, Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip,
  useDisclosure
} from "@nextui-org/react";
import MenuItem from "@/models/MenuItem";
import useValidatedState from "@/components/utils/useValidatedState";
import {useState} from "react";
import {FaDollarSign} from "react-icons/fa";
import IngredientEditor from "@/components/manager/IngredientEditor";
import InventoryItemEditor from "@/components/manager/InventoryItemEditor";
import {FaPencil, FaTrashCan} from "react-icons/fa6";


/**
 * A modal which allows for creation & editing of menu items.
 * @param children {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param menuItem {MenuItem | null} The menu item to edit, or null if creating a new one.
 * @param onMenuItemChange Callback function for submitting the new/modified menu item.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MenuItemEditor({children, menuItem = null, onMenuItemChange}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const defaultName = menuItem == null ? "" : menuItem.name.toString();
  const defaultPrice = menuItem == null ? "" : menuItem.price.toString();
  const defaultComponents = menuItem == null ? [] : menuItem.inventoryItemIds.map((id, idx) => {return {id: id, amount: menuItem.inventoryItemAmounts[idx]}});
  const defaultCategoryId = menuItem == null ? "" : menuItem.categoryId.toString();
  const defaultSeasonal = menuItem == null ? false : menuItem.seasonal;
  const defaultStartDate = menuItem == null || menuItem.startDate == null ? "" : menuItem.startDate.toString();
  const defaultEndDate = menuItem == null || menuItem.endDate == null ? "" : menuItem.endDate.toString();

  const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value));

  const [name, setName, resetName, isNameValid, isNameChanged] = useValidatedState(defaultName, s => s.trim() !== "");
  const [price, setPrice, resetPrice, isPriceValid, isPriceChanged] = useValidatedState(defaultPrice, p => isNumber(p) && parseFloat(p) >= 0);
  const [ingredients, setIngredients] = useState(defaultComponents);
  const [categoryId, setCategoryId, resetCategoryId, isCategoryIdValid, isCategoryIdChanged] = useValidatedState(defaultCategoryId, isNumber);
  const [seasonal, setSeasonal] = useState(defaultSeasonal);
  const [startDate, setStartDate, resetStartDate, isStartDateValid, isStartDateChanged] = useValidatedState(defaultStartDate, d => d.trim() !== "");
  const [endDate, setEndDate, resetEndDate, isEndDateValid, isEndDateChanged] = useValidatedState(defaultEndDate, d => d.trim() !== "");

  const handleOpen = () => {
    resetName();
    resetPrice();
    setIngredients(defaultComponents);
    resetCategoryId();
    setSeasonal(defaultSeasonal);
    resetStartDate();
    resetEndDate();
    onOpen();
  }
  const handleSubmit = (onClose) => {
    if (isNameValid && isPriceValid && isCategoryIdValid && isStartDateValid && isEndDateValid) {
      onMenuItemChange(new MenuItem(
        menuItem == null ? -1 : menuItem.menuItemId,
        name,
        parseFloat(price),
        ingredients.map(({id}) => id),
        ingredients.map(({amount}) => amount),
        categoryId,
        seasonal,
        startDate,
        endDate
      ));
      onClose();
    } else {
      setName(name);
      setPrice(price);
      setIngredients(ingredients);
      setCategoryId(categoryId);
      setSeasonal(seasonal);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  return (
    <div>
      {children(handleOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <div>
              {
                menuItem == null ? (
                  <ModalHeader>Create Menu Item</ModalHeader>
                ) : (
                  <ModalHeader>Edit Menu Item</ModalHeader>
                )
              }
              <ModalBody>
                <Input
                  isRequired
                  label="Name"
                  value={name}
                  onValueChange={setName}
                  isInvalid={!isNameValid && isNameChanged}
                />
                <Input
                  isRequired
                  label="Price"
                  type="number"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={price}
                  onValueChange={setPrice}
                  isInvalid={!isPriceValid && isPriceChanged}
                />
                <Card>
                  <CardHeader className="justify-between">
                    <>Ingredients</>
                    <IngredientEditor onIngredientChange={(_) => {}}>
                      {onOpen => (
                        <Button color="primary" onClick={onOpen}>Add ingredient</Button>
                      )}
                    </IngredientEditor>
                  </CardHeader>
                  <CardBody>
                    <Table isStriped removeWrapper>
                      <TableHeader>
                        <TableColumn>Inventory Item ID</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Actions</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {ingredients.map((ingredient, idx) => (
                          <TableRow key={ingredient.id}>
                            <TableCell>{ingredient.id}</TableCell>
                            <TableCell>{ingredient.amount}</TableCell>
                            <TableCell className="justify-between">
                              <div className="relative flex items-center gap-2">
                                <IngredientEditor ingredient={ingredient} onIngredientChange={(_) => {}}>
                                  {onOpen => (
                                    <Tooltip content="Edit">
                                      <Button isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil /></Button>
                                    </Tooltip>
                                  )}
                                </IngredientEditor>
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
                </Card>
                <Switch
                  isSelected={seasonal}
                  onValueChange={setSeasonal}
                >
                  Seasonal Item
                </Switch>
                {
                  seasonal ? (
                    <>
                      <Input
                        isRequired
                        label="Start Date"
                        value={startDate.slice(0,10)}
                        onValueChange={setStartDate}
                        isInvalid={!isStartDateValid && isStartDateChanged}
                      />
                      <Input
                        isRequired
                        label="End Date"
                        value={endDate.slice(0,10)}
                        onValueChange={setEndDate}
                        isInvalid={!isEndDateValid && isEndDateChanged}
                      />
                    </>
                  ) : (
                    <></>
                  )
                }
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button color="primary" onPress={() => handleSubmit(onClose)}>Submit</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}