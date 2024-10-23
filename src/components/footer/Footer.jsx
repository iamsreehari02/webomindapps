import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../assets/svg/webomindappsLogo.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={`${styles.footerContainer} text-white py-6"`}>
      <div className="container mx-auto flex justify-between items-center mb-6">
        <div className="brand-logo">
          <Image src={Logo} alt="" />
        </div>
        <div className="footer-icons flex space-x-4">
          <Image src="/images/socialIcons.png" alt="" width={190} height={75} />
        </div>
      </div>
      <div className="footer-links">
        <Link href="#" className="hover:underline">
          About Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
