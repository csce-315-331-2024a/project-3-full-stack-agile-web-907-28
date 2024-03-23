import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/MenuNavbar'; // Adjust the path as needed
import Styles from '../styles/menu/Menu.module.css';
import MenuSection from '../components/menu/MenuSection'; // Adjust the path as needed
import LoginModal from '../components/onboarding/LoginModal'; // Adjust path as needed

// Assuming you have a mapping of category IDs to names
const categories = [
  { id: 0, name: 'Burgers' },
  { id: 1, name: 'Baskets' },
  { id: 2, name: 'Fries' },
  { id: 3, name: 'Sides' },
  { id: 4, name: 'Sandwiches' },
  { id: 6, name: 'Drinks' },
  { id: 7, name: 'Desserts' },
];

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);


    useEffect(() => {
        // Fetch menu items from your API
        fetch('/api/menu/menuitems')
            .then(response => response.json())
            .then(data => {
                // Assuming `data` is an array of menu items
                setMenuItems(data);
            });
    }, []);


    return (
      <div>
          <Navbar onLoginClick={toggleLoginModal} />
          <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      </div>
    );
}
