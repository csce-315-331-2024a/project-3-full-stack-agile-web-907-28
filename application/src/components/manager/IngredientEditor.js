import {
  Autocomplete, AutocompleteItem,
  Button, Card, CardBody, CardFooter, CardHeader, Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  useDisclosure
} from "@nextui-org/react";
import MenuItem from "@/models/MenuItem";
import useValidatedState from "@/components/utils/useValidatedState";
import {useState} from "react";


/**
 * A modal which allows for creation & editing of individual components of menu items.
 * @param trigger {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param onIngredientChange Callback function for submitting the new/modified menu item component.
 * @param inventoryItems {[InventoryItem]} (optional) Array of InventoryItems used to validate IDs.
 * @param ingredient {{id: number, amount: number} | null} (optional) The ingredient to edit.
 * @returns {JSX.Element}
 * @constructor
 */
export default function IngredientEditor({trigger, onIngredientChange, inventoryItems=[], ingredient = null}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const defaultId = ingredient == null ? "" : ingredient.id.toString();
  const defaultAmount = ingredient == null ? "" : ingredient.amount.toString();

  const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value));

  const [id, setId, resetId, isIdValid, isIdChanged] = useValidatedState(defaultId, n => isNumber(n) && parseInt(n) >= 0);
  const [amount, setAmount, resetAmount, isAmountValid, isAmountChanged] = useValidatedState(defaultAmount, n => isNumber(n) && parseFloat(n) >= 0);

  const handleOpen = () => {
    resetId();
    resetAmount();
    onOpen();
  }
  const handleSubmit = (onClose) => {
    try {
      if (isIdValid && isAmountValid) {
        onIngredientChange({
          id: id,
          amount: amount
        });
        onClose();
      }
    } catch (e) {
      console.error("Error submitting ingredient", e);
    } finally {
      setId(id);
      setAmount(amount);
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
                ingredient == null ? (
                  <ModalHeader>Create Ingredient</ModalHeader>
                ) : (
                  <ModalHeader>Edit Ingredient</ModalHeader>
                )
              }
              <ModalBody>
                {inventoryItems.length !== 0 ? (
                  <Autocomplete
                    placeholder="Inventory item..."
                    selectedKey={id}
                    onSelectionChange={setId}
                    isInvalid={!isIdValid && isIdChanged}
                  >
                    {inventoryItems.map(item => (
                      <AutocompleteItem key={item.inventoryItemId}>{item.name}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                ) : (
                  <Input
                    isRequired
                    label="ID"
                    value={id}
                    onValueChange={setId}
                    isInvalid={!isIdValid && isIdChanged}
                  />
                )}
                <Input
                  isRequired
                  label="Amount"
                  type="number"
                  value={amount}
                  onValueChange={setAmount}
                  isInvalid={!isAmountValid && isAmountChanged}
                />
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