import {Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure} from "@nextui-org/react";

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
