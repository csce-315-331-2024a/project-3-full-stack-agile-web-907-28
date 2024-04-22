import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@nextui-org/react";
import axios from 'axios';

/**
 * This component is a modal for editing a user. It uses the nextui-org library for the modal and dropdown.
 * @param {Array} selectedUsers - The users to be edited.
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {function} onClose - The function to close the modal.
 * @returns {JSX.Element} - The modal component.
 */
export default function EditModal({selectedUsers, isOpen, onClose, onEditComplete}) {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [selectedCredentials, setSelectedCredentials] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            const currentUser = selectedUsers[currentUserIndex];
            setNewEmail(currentUser.email);
            setNewName(currentUser.name);
            setSelectedCredentials(currentUser.credentials);
            setIsModified(false); // Reset modification state when switching users
        }
    }, [currentUserIndex, selectedUsers]);

    const handleFieldChange = (field, value) => {
        setIsModified(true); // Mark as modified
        if (field === 'email') {
            setNewEmail(value);
        } else if (field === 'name') {
            setNewName(value);
        } else if (field === 'credentials') {
            setSelectedCredentials(value[Object.keys(value)[0]]);
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting user", selectedUsers[currentUserIndex].email, "with new email", newEmail, "and new name", newName, "and new credentials", selectedCredentials);
        // Construct the body using the current state
        const body = {
            email: selectedUsers[currentUserIndex].email,
            newName: newName,
            newEmail: newEmail,
            newCredentials: selectedCredentials
        };

        try {
            const response = await axios.post('/api/admin/editUser', body);
            console.log('Update response:', response.data);
            onEditComplete(); // Optionally close the modal on success
            onClose(); // Optionally close the modal on success
        } catch (error) {
            console.error('Failed to update user:', error.response?.data || error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <>
                <ModalHeader>Edit User</ModalHeader>
                <ModalBody>
                  {selectedUsers.length > 0 && (
                    <>
                      <Input
                        type="body"
                        value={newEmail}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="Email"
                        label="Email"
                      />
                      <Input
                        type="body"
                        value={newName}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        placeholder="Name"
                        label="Name"
                      />
                      <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" color="primary" size="md">
                              Credentials: {selectedCredentials}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Credentials selection"
                            variant="flat"
                            selectionMode="single"
                            selectedKeys={[selectedCredentials]}
                            onSelectionChange={(key) => handleFieldChange('credentials', key)}
                        >
                            <DropdownItem key="Admin">Admin</DropdownItem>
                            <DropdownItem key="Manager">Manager</DropdownItem>
                            <DropdownItem key="Cashier">Cashier</DropdownItem>
                            <DropdownItem key="Customer">Customer</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {isModified && (
                    <Button auto flat color="success" onClick={handleSubmit}>
                      Submit
                    </Button>
                  )}
                  <Button flat auto color="error" onClick={onClose}>
                    Close
                  </Button>
                  <Button flat auto onClick={() => setCurrentUserIndex(prevIndex => Math.max(prevIndex - 1, 0))} disabled={currentUserIndex === 0}>
                    Previous
                  </Button>
                  <Button flat auto onClick={() => setCurrentUserIndex(prevIndex => Math.min(prevIndex + 1, selectedUsers.length - 1))} disabled={currentUserIndex === selectedUsers.length - 1}>
                    Next
                  </Button>
                </ModalFooter>
            </>
          </ModalContent>
        </Modal>
    );
}
