import {Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure} from "@nextui-org/react";


/**
 * A modal to ask for confirmation before executing an action.
 * @param trigger {(onOpen: () => void) => ReactNode} Trigger to open the Modal.
 * @param onConfirm {() => void} Callback function for when confirmation is received.
 * @param body {string} (optional) The body of the dialog window.
 * @param noText {string} (optional) The text for the "no"/"cancel" option.
 * @param yesText {string} (optional) The text for the "yes"/"submit" option.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConfirmationDialog({trigger, onConfirm, body="Are you sure?", noText="No", yesText="Yes"}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleConfirm = (onClose) => {
    onClose();
    onConfirm();
  };

  return (
    <>
      {trigger(onOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>{noText}</Button>
                <Button color="primary" onPress={() => handleConfirm(onClose)}>{yesText}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
