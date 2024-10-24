import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../assets/svg/webomindappsLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { footerData, footerForm } from "@/utils/data";
import {
  BUTTON_LABELS,
  IMG_ALT,
  LIGHT_BLUE,
  PRIVACY_POLICY,
  WHITE,
} from "@/constants";
import InputComponent from "../inputComponent/InputComponent";
import CommonButton from "../commonButton/CommonButton";

const Footer = () => {
  return (
    <footer className={`${styles.footerContainer} py-6`}>
      <div className="container mx-auto flex justify-between mb-6">
        <div className="brand-logo">
          <Image src={Logo} alt={IMG_ALT.LOGO} />
        </div>
        <div className="footer-icons flex space-x-4">
          <Image
            src="/images/socialIcons.png"
            alt="Social Icons"
            width={190}
            height={75}
          />
        </div>
      </div>

      <div
        className={`${styles.footer} container mx-auto grid grid-cols-4 gap-8 mb-6 border-t-black`}
      >
        {footerData.map((section) => (
          <div key={section.id}>
            <h3 className="font-semibold mb-4 text-left">{section.title}</h3>
            {section.items.map((item, index) => (
              <p key={index} className="mb-3">
                <Link href="#" className="hover:underline text-black">
                  {item}
                </Link>
              </p>
            ))}
          </div>
        ))}

        <div>
          <h3 className="font-semibold mb-4 text-left">Get in touch</h3>
          {footerForm.map((data) => (
            <div key={data.id} className="mb-5">
              <InputComponent
                placeholder={data.placeholder}
                type={data.type}
                icon_alt={data.alt}
                icon={data.icon}
              />
            </div>
          ))}
          <CommonButton
            label={BUTTON_LABELS.CONTACT_US}
            backgroundColor={LIGHT_BLUE}
            fontColor={WHITE}
            arrowColor={WHITE}
          />
        </div>
      </div>

      <span className="text-left">{PRIVACY_POLICY}</span>
    </footer>
  );
};

export default Footer;
