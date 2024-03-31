import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/MenuNavbar';
import LoginModal from '../components/onboarding/LoginModal';

export default function CustomerInfo() {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

    useEffect(() => {
        // Fetch customer info from your API
        fetch('/api/customer/info')
            .then(response => response.json())
            .then(data => {
                // Assuming `data` is an object containing customer info
                setCustomerInfo(data);
            });
    }, []);

    // Function to calculate member type based on account age
    const calculateMemberType = () => {
        if (customerInfo) {
            const accountAge = calculateAccountAge(customerInfo.joinDate); // Assuming joinDate is available
            if (accountAge >= 1) {
                return "Gold Member";
            } else if (accountAge >= 0.5) {
                return "Silver Member";
            } else {
                return "Bronze Member";
            }
        }
        return "";
    };

    // Function to calculate account age
    const calculateAccountAge = (joinDate) => {
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - new Date(joinDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays / 365; // Account age in years
    };

    return (
        <div>
            <Navbar onLoginClick={toggleLoginModal} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

            <div className={Styles.customerInfoContainer}>
                {customerInfo && (
                    <div>
                        <h2>Welcome, {customerInfo.name}</h2>
                        <p>Account Age: {calculateAccountAge(customerInfo.joinDate)} years</p>
                        <p>Member Type: {calculateMemberType()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}