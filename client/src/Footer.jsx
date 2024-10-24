import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Importing faPaperPlane

const Footer = () => {
  return (
    <footer className="pt-12 pb-6 text-gray-400 bg-gray-900">
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto md:px-12 md:grid-cols-4">
        {/* Logo & Description */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Agrios</h2>
          <p className="mb-6">
            There are many variations of passages of lorem ipsum available, but
            the majority suffered.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h2 className="relative pb-5 mb-4 font-bold text-white">
            Explore
            <span className="absolute bottom-0 left-0 w-6 h-1 bg-green-500 "></span>
            <span className="absolute bottom-0 w-1 h-1 ml-2 bg-green-500 rounded-full left-6"></span>
          </h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                Our Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                Meet the Farmers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                Latest News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                <i className="mr-2 fa-solid fa-leaf"></i>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* News */}
        <div>
          <h2 className="relative pb-5 mb-4 font-bold text-white">
            News
            <span className="absolute bottom-0 left-0 w-6 h-1 bg-green-500 "></span>
            <span className="absolute bottom-0 w-1 h-1 ml-2 bg-green-500 rounded-full left-6"></span>
          </h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Bringing Food Production Back To Cities
              </a>
              <p className="text-sm">July 5, 2022</p>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                The Future of Farming, Smart Irrigation Solutions
              </a>
              <p className="text-sm">July 5, 2022</p>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="relative pb-5 mb-4 font-bold text-white">
            Contact
            <span className="absolute bottom-0 left-0 w-6 h-1 bg-green-500 "></span>
            <span className="absolute bottom-0 w-1 h-1 ml-2 bg-green-500 rounded-full left-6"></span>
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <i className="fas fa-phone"></i>
              <span>666 888 0000</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-envelope"></i>
              <span>needhelp@company.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt"></i>
              <span>80 Brooklyn Golden Street Line, New York, USA</span>
            </li>
          </ul>
          <div className="mt-4">
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-grow p-4 text-white bg-gray-800 rounded-l-md"
              />
              <button className="p-4 text-white bg-green-500 hover:bg-green-600 rounded-r-md">
                <FontAwesomeIcon icon={faPaperPlane} />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="pt-6 mt-12 text-sm text-center border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* All Rights Reserved */}
          <p className="text-cente">© All Copyright 2024 by shawonetc Themes</p>

          {/* Terms of Use and Privacy Policy */}
          <div className="justify-center mt-4 space-x-4 md:justify-center md:mt-0">
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
