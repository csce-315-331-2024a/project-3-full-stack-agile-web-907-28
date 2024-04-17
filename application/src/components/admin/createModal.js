import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from "@nextui-org/react";
import axios from 'axios';

/**
 * This component is a modal for creating a new user. It uses the nextui-org library for the modal and dropdown.
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {function} onClose - The function to close the modal.
 * @returns {JSX.Element} - The modal component.
 */
export default function CreateUserModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [credentials, setCredentials] = useState("");

    const handleSubmit = async () => {
        const body = { email, name, credentials: credentials[Object.keys(credentials)[0]] };

        try {
            const response = await axios.post('/api/admin/createUser', body);
            console.log('User creation response:', response.data);
            // Consider closing the modal or showing a success message
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Failed to create user:', error.response?.data || error.message);
            // Optionally handle the error, e.g., show an error message to the user
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Create New User</ModalHeader>
                <ModalBody>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        type="body"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        label="Email"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        type="body"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        label="Name"
                    />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" color="primary" size="md">
                                {credentials || "Select Credentials"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            selectedKeys={[credentials]}
                            onSelectionChange={(key) => setCredentials(key)}
                            selectionMode="single"
                            aria-label="Select Credentials"
                        >
                            <DropdownItem key="Admin">Admin</DropdownItem>
                            <DropdownItem key="Manager">Manager</DropdownItem>
                            <DropdownItem key="Cashier">Cashier</DropdownItem>
                            <DropdownItem key="Customer">Customer</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button flat auto color="error" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
