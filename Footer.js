import Styles from '../../styles/footer/Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerContent}>
        <div className={Styles.socialIcons}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
        <Link href="https://www.accessibilitychecker.org/" target="_blank" className="btn">
          Accessibility Options
        </Link>
        <div className={Styles.copyRight}>
          &copy; {new Date().getFullYear()} Rev's American Grill. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;