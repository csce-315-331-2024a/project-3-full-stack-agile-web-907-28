import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";
import React, { useEffect, useState } from 'react';
import DefaultLayout from "@/layouts/default";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    RadioGroup,
    Radio,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    useDisclosure
  } from "@nextui-org/react";
import axios from 'axios';

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];


export default function Admin() {
    function isCredentialAuthorized(credential) {
        return credential === UserCredentials.Cashier || credential === UserCredentials.Admin || credential === UserCredentials.Manager;
    }

    const [users, setUsers] = useState([]);
    const [selectedColor, setSelectedColor] = useState(colors[3]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentUserIndex, setCurrentUserIndex] = useState(0);



    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/admin/getUsers');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleEditSelected = () => {
        if (selectedUsers.length > 0) {
          onOpen();
          setCurrentUserIndex(0);
        } else {
          alert("No users selected for editing.");
        }
      };
      

    const handleDeleteSelected = async () => {
        try {
            console.log("Selected emails:", selectedEmails);
            // Iterate over the selected emails and delete each user
            for (const email of selectedEmails) {
                const emailToDelete = email[Object.keys(email)[0]];
                await axios.delete('/api/admin/deleteUsers', { 
                    headers: { 'Content-Type': 'application/json' },
                    data: { email: emailToDelete } 
                }).then((response) => {
                    console.log(response.data.message);
                });
            }
            
            console.log("Selected users deleted successfully");
            // Refresh the users list or filter out the deleted users from the state
            setUsers(users.filter(user => !selectedEmails.map(emailObj => emailObj[Object.keys(emailObj)[0]]).includes(user.email)));
            setSelectedEmails([]);
            setSelectedUsers([]);
        } catch (error) {
            console.error("Failed to delete the selected users:", error);
        }
    };

      //Function to handle the selection of users
      const handleSelection = (email) => {
        setSelectedEmails(prevSelected => [...prevSelected, email]);
        setSelectedUsers(prevSelected => [...prevSelected, users.find(user => user.email === email[Object.keys(email)[0]])]);
        console.log("Selected users:", selectedUsers);
      };
      

      
      

    return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <DefaultLayout>
        <div className="flex flex-col gap-3">
            <Table 
                color={selectedColor}
                selectionMode="multiple" 
                defaultSelectedKeys={selectedEmails} 
                aria-label="Example static collection table"
                onSelectionChange={handleSelection}
            >
                <TableHeader>
                <TableColumn>Email</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Credentials</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.email}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.credentials}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="flex flex-row gap-3 pt-5 pl-1">
            <Button onClick={handleDeleteSelected}>Delete Selected Users</Button>
            <Button onClick={handleEditSelected}>Edit Selected Users</Button>
        </div>
        </DefaultLayout>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader>Edit User</ModalHeader>
                <ModalBody>
                  {selectedUsers.length > 0 && (
                    <>
                      <p>Email: {selectedUsers[currentUserIndex].email}</p>
                      <p>Name: {selectedUsers[currentUserIndex].name}</p>
                      <p>Credentials: {selectedUsers[currentUserIndex].credentials}</p>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
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
            )}
          </ModalContent>
        </Modal>
    </RestrictedAccess>
    );
}
