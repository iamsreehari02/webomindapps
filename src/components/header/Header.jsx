"use client";
import { navItems } from "@/utils/data";
import Image from "next/image";
import React, { useState } from "react";
import LOGO from "../../assets/svg/webomindappsLogo.svg";
import { BUTTON_LABELS, IMG_ALT, ROUTES } from "@/constants";
import styles from "./Header.module.css";
import CommonButton from "../commonButton/CommonButton";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`bg-white  ${styles.navBar}`}>
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Image src={LOGO} alt={IMG_ALT.LOGO} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <CommonButton label={BUTTON_LABELS.SCHEDULE_DEMO} />
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${
          mobileMenuOpen ? "absolute top-16 inset-x-0 z-50 block" : "hidden"
        } bg-white`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border-b border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <CommonButton label={BUTTON_LABELS.SCHEDULE_DEMO} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
