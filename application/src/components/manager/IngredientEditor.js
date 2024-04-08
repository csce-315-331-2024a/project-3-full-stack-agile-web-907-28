import {
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
 * @param children {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param ingredient {{id: number, amount: number} | null} The menu item component to edit, or null if creating a new one.
 * @param onIngredientChange Callback function for submitting the new/modified menu item component.
 * @returns {JSX.Element}
 * @constructor
 */
export default function IngredientEditor({children, ingredient = null, onIngredientChange}) {
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
    if (isIdValid && isAmountValid) {
      onIngredientChange({
        id: id,
        amount: amount
      });
      onClose();
    } else {
      setId(id);
      setAmount(amount);
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
                ingredient == null ? (
                  <ModalHeader>Create Ingredient</ModalHeader>
                ) : (
                  <ModalHeader>Edit Ingredient</ModalHeader>
                )
              }
              <ModalBody>
                <Input
                  isRequired
                  label="ID"
                  value={id}
                  onValueChange={setId}
                  isInvalid={!isIdValid && isIdChanged}
                />
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