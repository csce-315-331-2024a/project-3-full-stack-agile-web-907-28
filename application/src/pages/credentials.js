import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../styles/onboarding/Credentials.module.css';
import { useRouter } from 'next/router';

const Credentials = () => {
  const [role, setRole] = useState('');
  const { data: session } = useSession(); // Use the session
  const router = useRouter();

  console.log('Credentials');

  const handleSubmit = async (e) => {
    console.log('This user is a', role);
    e.preventDefault();

    // Make sure session data is available
    if (!session) {
      console.error('Session data is not available');
      return;
    }

    const { email, name } = session.user; // Destructure email and name from session.user

    const response = await fetch('/api/onboarding/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, credentials: role }), // Include email and name in the request body
    });

    session.user.isNewUser = false; // Update the session to indicate the user is no longer new
    router.push('/menu'); // Redirect to the menu page
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Select Your Credentials</h2>
        <label>
          <input
            type="radio"
            value="Manager"
            checked={role === 'Manager'}
            onChange={(e) => setRole(e.target.value)}
          />
          Manager
        </label>
        <label>
          <input
            type="radio"
            value="Customer"
            checked={role === 'Customer'}
            onChange={(e) => setRole(e.target.value)}
          />
          Customer
        </label>
        <label>
          <input
            type="radio"
            value="Cashier"
            checked={role === 'Cashier'}
            onChange={(e) => setRole(e.target.value)}
          />
          Cashier
        </label>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Credentials;

