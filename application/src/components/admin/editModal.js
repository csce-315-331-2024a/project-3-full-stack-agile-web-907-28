import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem, 
    Input
  } from "@nextui-org/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

//Take the selectedUsers and selectedCredentials from the parent component
export default function EditModal({selectedUsers, isOpen, onClose}) {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [selectedCredentials, setSelectedCredentials] = useState([]);
    const [selectedUser, setSelectedUser] = useState(selectedUsers[currentUserIndex]);
    const [newEmail , setNewEmail] = useState(selectedUsers[currentUserIndex].email);
    const [newName , setNewName] = useState(selectedUsers[currentUserIndex].name);

    //Function to hadnle in the modal when next or previous is clikde, selectedCredentials need to be updated
    const handleNext = () => {
        setCurrentUserIndex(prevIndex => Math.min(prevIndex + 1, selectedUsers.length - 1));
        setSelectedCredentials(selectedUsers[currentUserIndex].credentials);
    }

    const handlePrevious = () => {
        setCurrentUserIndex(prevIndex => Math.max(prevIndex - 1, 0));
        setSelectedCredentials(selectedUsers[currentUserIndex].credentials);
    }

    useEffect(() => {
        // console.log("First user selected creds", selectedUsers[currentUserIndex].credentials);
        if (selectedUsers.length > 0) {
            setSelectedUser(selectedUsers[currentUserIndex]);
            setSelectedCredentials(selectedUsers[currentUserIndex].credentials);
            console.log("Current User to edit is", selectedUser, " and his credentials are", selectedCredentials);
        }
    }, [currentUserIndex, selectedUsers]);

    const handleFieldChange = (field, value) => {
        if (field === 'email') {
            setNewEmail(value);
        } else if (field === 'name') {
            setNewName(value);
        }
    }

    


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader>Edit User</ModalHeader>
                <ModalBody>
                  {selectedUsers.length > 0 && (
                    <>
                      <Input
                        type="text"
                        value={selectedUsers[currentUserIndex].email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="Email"
                        label="Email"
                      />
                      <Input
                        type="text"
                        value={selectedUsers[currentUserIndex].name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        placeholder="Name"
                        label="Name"
                      />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button 
                            variant="bordered" 
                            color="primary"
                            size="md"
                            >
                            Credentials: {selectedCredentials}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Multiple selection example"
                            variant="flat"
                            closeOnSelect={false}
                            disallowEmptySelection
                            selectionMode="multiple"
                            selectedKeys={selectedCredentials}
                            onSelectionChange={setSelectedCredentials}
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
                  <Button flat auto color="error" onClick={onClose}>
                    Close
                  </Button>
                  <Button flat auto onClick={handlePrevious} disabled={currentUserIndex === 0}>
                    Previous
                  </Button>
                  <Button flat auto onClick={handleNext} disabled={currentUserIndex === selectedUsers.length - 1}>
                    Next
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    )
}

