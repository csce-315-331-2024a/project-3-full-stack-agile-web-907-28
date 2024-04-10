import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import InventoryItem from "@/models/InventoryItem";
import useValidatedState from "@/components/utils/useValidatedState";
import {useState} from "react";


/**
 * A modal which allows for creation & editing of inventory items.
 * @param trigger {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param onInventoryItemChange Callback function for submitting the new/modified inventory item.
 * @param inventoryItem {InventoryItem | null} (optional) The inventory item to edit.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InventoryItemEditor({trigger, onInventoryItemChange, inventoryItem = null}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const defaultName = inventoryItem == null ? "" : inventoryItem.name.toString();
  const defaultQuantity = inventoryItem == null ? "" : inventoryItem.quantity.toString();
  const defaultPurchaseDate = inventoryItem == null ? "" : inventoryItem.purchaseDate.toISOString().slice(0,10);
  const defaultExpiryDate = inventoryItem == null ? "" : inventoryItem.expiryDate.toISOString().slice(0,10);
  const defaultQuantityLimit = inventoryItem == null ? "0" : inventoryItem.quantityLimit.toString();

  const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value));

  const [name, setName, resetName, isNameValid, isNameChanged] = useValidatedState(defaultName, s => s.trim() !== "");
  const [quantity, setQuantity, resetQuantity, isQuantityValid, isQuantityChanged] = useValidatedState(defaultQuantity, isNumber);
  const [purchaseDate, setPurchaseDate, resetPurchaseDate, isPurchaseDateValid, isPurchaseDateChanged] = useValidatedState(defaultPurchaseDate, d => d.trim() !== "");
  const [expiryDate, setExpiryDate, resetExpiryDate, isExpiryDateValid, isExpiryDateChanged] = useValidatedState(defaultExpiryDate, d => d.trim() !== "");
  const [quantityLimit, setQuantityLimit, resetQuantityLimit, isQuantityLimitValid, isQuantityLimitChanged] = useValidatedState(defaultQuantityLimit, isNumber);

  const [error, setError] = useState("");

  const handleOpen = () => {
    resetName();
    resetQuantity();
    resetPurchaseDate();
    resetExpiryDate();
    resetQuantityLimit();
    onOpen();
  }
  const handleSubmit = (onClose) => {
    try {
      if (isNameValid && isQuantityValid && isPurchaseDateValid && isExpiryDateValid && isQuantityLimitValid) {
        onInventoryItemChange(new InventoryItem(
          inventoryItem == null ? -1 : inventoryItem.inventoryItemId,
          name,
          parseFloat(quantity),
          new Date(purchaseDate),
          new Date(expiryDate),
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
                <Input
                  isRequired
                  label="Purchase Date"
                  type="date"
                  value={purchaseDate}
                  onValueChange={setPurchaseDate}
                  isInvalid={!isPurchaseDateValid && isPurchaseDateChanged}
                />
                <Input
                  isRequired
                  label="Expiry Date"
                  type="date"
                  value={expiryDate}
                  onValueChange={setExpiryDate}
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