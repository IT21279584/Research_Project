import React from "react";
import logo from "./assets/logo-removebg.png";

const Footer = () => {
  return (
    <footer className="px-4 py-12 text-white bg-green-800">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-3">
        {/* Left Section with Logo and Subscribe */}
        <div className="flex flex-col items-start md:col-span-1">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Farm Guard Logo"
              className="mr-3 w-72" // Set a desired width
            />
          </div>

          <div className="w-full">
            <p className="mb-2">Subscribe to our channel</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-10 py-2 text-gray-900 placeholder-white bg-gray-600 rounded-md focus:outline-none"
              />
              <span className="absolute inset-y-0 flex items-center text-white left-3">
                <i className="fas fa-envelope"></i> {/* Email icon in white */}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with Paragraph and Links */}
        <div className="text-left md:col-span-2">
          <p className="mb-4 leading-relaxed text-m">
            Discover a premier AI-based platform offering comprehensive farming
            experience. With a rich heritage of over thousands of years in
            traditional farming techniques, this platform provides a combination
            of the latest technology with traditional farming worldwide. From
            large-scale farms and factories to small fields of crops, our
            platform provides services for disease management, quality
            assessment, and more farming sectors.
          </p>
          <div className="flex justify-between text-left">
            <div>
              <h2 className="mb-2 text-lg font-semibold">Services</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">News</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    Trips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">Community</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    Vlogs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:underline">
                    Feedbacks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">About Us</h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
