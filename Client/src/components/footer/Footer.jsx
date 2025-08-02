import React from "react";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-gray-900 font-[Manrope]">
              Flowtext
            </Link>
            <p className="mt-2 text-sm font-[Manrope] font-[Manrope]">
              &copy; {currentYear} Flowtext. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 font-[Manrope]">
            <Link
              to="/about"
              className="hover:text-blue-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/features"
              className="hover:text-blue-600 transition duration-200"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:text-blue-600 transition duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <Link
              to="/"
              aria-label="Twitter"
              className="hover:text-blue-600 transition duration-200"
            >
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link
              to="/"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition duration-200"
            >
              <FaLinkedinIn className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
