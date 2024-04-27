import {
  Button, DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import InventoryItem from "@/models/InventoryItem";
import useValidatedState from "@/react-hooks/useValidatedState";
import {useState} from "react";
import {fromDate, toCalendarDate} from "@internationalized/date";


/**
 * A modal which allows for creation & editing of inventory items.
 * @param {(onOpen: () => void) => ReactNode} trigger - The trigger to open the Modal.
 * @param {(InventoryItem) => void} onInventoryItemChange - The callback function for submitting the new/modified inventory item.
 * @param {InventoryItem | null} inventoryItem - The inventory item to edit.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InventoryItemEditor({trigger, onInventoryItemChange, inventoryItem = null}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const defaultName = inventoryItem == null ? "" : inventoryItem.name.toString();
  const defaultQuantity = inventoryItem == null ? "" : inventoryItem.quantity.toString();
  const defaultPurchaseDate = inventoryItem == null ? undefined : toCalendarDate(fromDate(inventoryItem.purchaseDate, "UTC"));
  const defaultExpiryDate = inventoryItem == null ? undefined : toCalendarDate(fromDate(inventoryItem.expiryDate, "UTC"));
  const defaultQuantityLimit = inventoryItem == null ? "0" : inventoryItem.quantityLimit.toString();

  const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value));

  const [name, setName, resetName, isNameValid, isNameChanged] = useValidatedState(defaultName, s => s.trim() !== "");
  const [quantity, setQuantity, resetQuantity, isQuantityValid, isQuantityChanged] = useValidatedState(defaultQuantity, q => isNumber(q) && parseFloat(q) > 0);
  const [purchaseDate, setPurchaseDate, resetPurchaseDate, isPurchaseDateValid, isPurchaseDateChanged] = useValidatedState(defaultPurchaseDate, d => d !== undefined);
  const [expiryDate, setExpiryDate, resetExpiryDate, isExpiryDateValid, isExpiryDateChanged] = useValidatedState(defaultExpiryDate, d => d !== undefined);
  const [quantityLimit, setQuantityLimit, resetQuantityLimit, isQuantityLimitValid, isQuantityLimitChanged] = useValidatedState(defaultQuantityLimit, q => isNumber(q) && parseFloat(q) >= 0);

  const [error, setError] = useState("");

  /**
   * This function handles the opening of the Modal. It resets the name, quantity, purchaseDate, expiryDate, and quantityLimit states and opens the Modal.
   */
  const handleOpen = () => {
    resetName();
    resetQuantity();
    resetPurchaseDate();
    resetExpiryDate();
    resetQuantityLimit();
    onOpen();
  }

  /**
   * This function handles the submission of the form. It sends a POST request to the /api/inventory/updateInventoryItem endpoint with the newInventoryItem.
   * @param {function} onClose - The function to close the Modal.
   */
  const handleSubmit = (onClose) => {
    try {
      if (isNameValid && isQuantityValid && isPurchaseDateValid && isExpiryDateValid && isQuantityLimitValid) {
        onInventoryItemChange(new InventoryItem(
          inventoryItem == null ? -1 : inventoryItem.inventoryItemId,
          name,
          parseFloat(quantity),
          purchaseDate.toDate(),
          expiryDate.toDate(),
          parseFloat(quantityLimit)
        ));
        onClose();
      }
      setError("");
    } catch (e) {
      setError(e);
    } finally {
      setName(name);
      setQuantity(quantity);
      setPurchaseDate(purchaseDate);
      setExpiryDate(expiryDate);
      setQuantityLimit(quantityLimit);
    }
  };

  return (
    <>
      {trigger(handleOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {
                inventoryItem == null ? (
                  <ModalHeader>Create Inventory Item</ModalHeader>
                ) : (
                  <ModalHeader>Edit Inventory Item</ModalHeader>
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
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onValueChange={setQuantity}
                  isInvalid={!isQuantityValid && isQuantityChanged}
                />
                <DatePicker
                  isRequired
                  label="Purchase Date"
                  value={purchaseDate}
                  onChange={setPurchaseDate}
                  isInvalid={!isPurchaseDateValid && isPurchaseDateChanged}
                />
                <DatePicker
                  isRequired
                  label="Expiry Date"
                  value={expiryDate}
                  onChange={setExpiryDate}
                  isInvalid={!isExpiryDateValid && isExpiryDateChanged}
                />
                <Input
                  label="Quantity Limit"
                  type="number"
                  placeholder="0"
                  value={quantityLimit}
                  onValueChange={setQuantityLimit}
                  isInvalid={!isQuantityLimitValid && isQuantityLimitChanged}
                />
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