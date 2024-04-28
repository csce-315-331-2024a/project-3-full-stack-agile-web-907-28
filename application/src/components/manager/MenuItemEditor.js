import {
  Autocomplete, AutocompleteItem,
  Button, Card, CardBody, CardHeader,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip,
  useDisclosure
} from "@nextui-org/react";
import MenuItem from "@/models/MenuItem";
import useValidatedState from "@/react-hooks/useValidatedState";
import {useContext, useState} from "react";
import IngredientEditor from "@/components/manager/IngredientEditor";
import {FaPencil, FaTrashCan} from "react-icons/fa6";
import menuCategories from "@/models/menuCategories";
import ConfirmationDialog from "@/components/utils/ConfirmationDialog";
import InventoryContext from "@/contexts/InventoryContext";
import {fromDate, toCalendarDate} from "@internationalized/date";


/**
 * This function handles the creation & editing of menu items.
 * @param {(onOpen: () => void) => ReactNode} trigger - The trigger to open the Modal.
 * @param {(MenuItem) => void} onMenuItemChange - The callback function for submitting the new/modified menu item.
 * @param {MenuItem | null} menuItem - The menu item to edit.
 * @returns {JSX.Element}
 */
export default function MenuItemEditor({trigger, onMenuItemChange, menuItem = null}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {inventoryItems} = useContext(InventoryContext);

  const defaultName = menuItem == null ? "" : menuItem.name.toString();
  const defaultPrice = menuItem == null ? "" : menuItem.price.toString();
  const defaultComponents = menuItem == null ? [] : menuItem.inventoryItemIds.map((id, idx) => {return {id: id, amount: menuItem.inventoryItemAmounts[idx]}});
  const defaultCategoryId = menuItem == null ? "" : menuItem.categoryId.toString();
  const defaultSeasonal = menuItem == null ? false : menuItem.seasonal;
  const defaultStartDate = menuItem == null || !menuItem.seasonal ? undefined : toCalendarDate(fromDate(menuItem.startDate, "UTC"));
  const defaultEndDate = menuItem == null || !menuItem.seasonal ? undefined : toCalendarDate(fromDate(menuItem.endDate, "UTC"));

  const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value));

  const [name, setName, resetName, isNameValid, isNameChanged] = useValidatedState(defaultName, s => s.trim() !== "--");
  const [price, setPrice, resetPrice, isPriceValid, isPriceChanged] = useValidatedState(defaultPrice, p => isNumber(p) && parseFloat(p) >= 0);
  const [ingredients, setIngredients] = useState(defaultComponents);
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [seasonal, setSeasonal] = useState(defaultSeasonal);
  const [startDate, setStartDate, resetStartDate, isStartDateValid, isStartDateChanged] = useValidatedState(defaultStartDate, d => d !== undefined);
  const [endDate, setEndDate, resetEndDate, isEndDateValid, isEndDateChanged] = useValidatedState(defaultEndDate, d => d !== undefined);

  const [error, setError] = useState("");

  /**
   * This function handles the opening of the Modal. It resets the name, price, ingredients, categoryId, seasonal, startDate, and endDate states and opens the Modal.
   */
  const handleOpen = () => {
    resetName();
    resetPrice();
    setIngredients(defaultComponents);
    setCategoryId(defaultCategoryId);
    setSeasonal(defaultSeasonal);
    resetStartDate();
    resetEndDate();
    onOpen();
  }

  /**
   * This function handles the submission of the form. It sends a POST request to the /api/menu/createMenuItem endpoint with the menuItem.
   * @param {function} onClose - The function to close the Modal.
   */
  const handleSubmit = (onClose) => {
    try {
      if (isNameValid && isPriceValid && (!seasonal || (isStartDateValid && isEndDateValid))) {
        onMenuItemChange(new MenuItem(
          menuItem == null ? -1 : menuItem.menuItemId,
          name,
          parseFloat(price),
          ingredients.map(({id}) => id),
          ingredients.map(({amount}) => amount),
          categoryId,
          seasonal,
          seasonal ? startDate.toDate() : new Date(),
          seasonal ? endDate.toDate() : new Date()
        ));
        onClose();
      }
      setError("");
    } catch (e) {
      setError(e);
    } finally {
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
      {trigger(handleOpen)}
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
                      <span className="body-default-400 body-small">$</span>
                    </div>
                  }
                  value={price}
                  onValueChange={setPrice}
                  isInvalid={!isPriceValid && isPriceChanged}
                />
                <Autocomplete label="Category" selectedKey={categoryId} onSelectionChange={setCategoryId}>
                  {menuCategories.map(category => (
                    <AutocompleteItem key={category.id}>
                      {category.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Card>
                  <CardHeader className="justify-between">
                    <>Ingredients</>
                    <IngredientEditor
                      trigger={onOpen => (
                        <Button color="primary" onClick={onOpen}>Add ingredient</Button>
                      )}
                      onIngredientChange={newIngredient => {
                        const newIngredients = ingredients.slice();
                        newIngredients.push(newIngredient);
                        setIngredients(newIngredients);
                        console.log(newIngredients);
                        console.log(inventoryItems);
                      }}
                      inventoryItems={inventoryItems}
                    />
                  </CardHeader>
                  <CardBody>
                    <Table isStriped removeWrapper>
                      <TableHeader>
                        <TableColumn>Inventory Item Name</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Actions</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {ingredients.map((ingredient, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{
                              inventoryItems.some(item => item.inventoryItemId === parseInt(ingredient.id)) ? (
                                inventoryItems.find(item => item.inventoryItemId === parseInt(ingredient.id)).name
                              ) : (
                                ingredient.id
                              ).toString()
                            }</TableCell>
                            <TableCell>{ingredient.amount}</TableCell>
                            <TableCell className="justify-between">
                              <div className="relative flex items-center gap-2">
                                <IngredientEditor
                                  trigger={onOpen => (
                                    <Button isIconOnly onClick={onOpen} size="sm" variant="light"><FaPencil /></Button>
                                  )}
                                  onIngredientChange={newIngredient => {
                                    const newIngredients = ingredients.slice();
                                    newIngredients[idx] = newIngredient;
                                    setIngredients(newIngredients);
                                  }}
                                  ingredient={ingredient}
                                  inventoryItems={inventoryItems}
                                />
                                <ConfirmationDialog
                                  trigger={onOpen => (
                                    <Button color="danger" isIconOnly onClick={onOpen} size="sm" variant="light"><FaTrashCan /></Button>
                                  )}
                                  onConfirm={() => {
                                    const newIngredients = ingredients.filter((_, i) => i !== idx);
                                    setIngredients(newIngredients);
                                  }}
                                />
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
                      <DatePicker
                        isRequired
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                      />
                      <DatePicker
                        isRequired
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                      />
                    </>
                  ) : (
                    <></>
                  )
                }
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
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}