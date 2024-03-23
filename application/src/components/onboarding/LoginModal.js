import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'; // Import signOut
import { useRouter } from 'next/router';
import Modal from './Modal'; 
import styles from '../../styles/onboarding/LoginModal.module.css';
import { FaGoogle } from 'react-icons/fa';

const LoginModal = ({ isOpen, onClose }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.isNewUser) {
      router.push('/credentials');
      onClose(); // Close the modal upon redirect
    }
  }, [session, status, router, onClose]);

  const handleSignOut = async () => {
    const signOutResponse = await signOut({ redirect: false, callbackUrl: "/login" });
    if (signOutResponse.url) {
      router.push(signOutResponse.url);
    }
    onClose(); // Optionally close the modal upon sign out
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.loginContent}>
        <h2>{session ? 'Welcome ' + session.user.name : 'Login'}</h2>
        {session ? (
          <>
            <button onClick={handleSignOut} className={styles.loginButton}>
              Sign out
            </button>
          </>
        ) : (
          <button onClick={() => signIn("google")} className={styles.loginButton}>
            <FaGoogle /> Sign in with Google
          </button>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
