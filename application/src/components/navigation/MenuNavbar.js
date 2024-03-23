import { useSession } from 'next-auth/react';
import styles from '../../styles/navigation/menuNavbar.module.css';
import Image from 'next/image';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ onLoginClick }) => {
  const { data: session } = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/logo_transparent.png" alt="Logo" width={180} height={100} />
      </div>

      <div className={styles.loginAndCart}>
        {session ? (
          <div onClick={onLoginClick} className={styles.userInfo}>
            Welcome, {session.user.name}
          </div>
        ) : (
          <div onClick={onLoginClick} className={styles.loginIcon}>
            <FaUserCircle size="24px" />
          </div>
        )}
        <FaShoppingCart />
      </div>
    </div>
  );
};

export default Navbar;
