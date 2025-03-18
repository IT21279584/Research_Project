import React from "react";
import main from "./assets/sign-in.jpg";
import mission from "./assets/slide-two.jpg";
import vision from "./assets/slide-three.jpg";
import eggs from "./assets/egg.jpg";
import soybeans from "./assets/soybeanbanner.jpg";
import crops from "./assets/background.jpg";
import iamge from "./assets/image.png";
import Footer from "./Footer";
import Header from "./Header";

const AboutUs = () => {
  return (
    <div className="font-archivo">
      <Header />
      <div className="w-full mb-8 bg-white">
        {/* Hero Section */}
        <div className="px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Revolutionizing agriculture <br /> with AI-powered solutions for{" "}
            <br /> smart farming
          </h1>
          <div className="flex justify-center mt-6">
            <div className="w-full max-w-4xl">
              <img
                src={main}
                alt="Smart Farming"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="flex justify-center px-4 py-12 bg-green-100 md:px-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-[1100px]">
            {/* Mission */}
            <div className="flex flex-col items-start w-full md:w-[500px]">
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="my-5 text-gray-700">
                Our mission is to provide farmers and agricultural businesses
                with an intelligent web-based platform that leverages advanced
                image processing and machine learning technologies.
              </p>
              <img
                src={mission}
                alt="Greenhouse"
                className="w-full h-48 rounded-lg shadow-md"
              />
            </div>

            {/* Vision */}
            <div className="flex flex-col items-start w-full md:w-[500px]">
              <img
                src={vision}
                alt="Farm"
                className="w-full h-48 mb-4 rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-2 text-gray-700">
                To revolutionize modern farming by empowering farmers with
                AI-driven solutions for precise crop and food quality
                assessment, ensuring healthier yields and sustainable practices.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-12 md:px-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            {/* Left section with title and description */}
            <div className="w-full px-4 md:px-32 md:w-1/2">
              <h2 className="text-2xl font-bold text-left text-gray-900">
                Together, We Find <br /> A Way
              </h2>
              <p className="mt-2 text-left text-gray-700">
                Boldly Advancing Smart Agriculture: Overcoming Challenges for a
                Sustainable Future.
              </p>
            </div>

            {/* Right section with the grid layout */}
            <div className="w-full px-4 mt-6 md:px-32 md:mt-0 md:w-1/2">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <div>
                  <h3 className="font-semibold">Who we are</h3>
                  <p className="text-gray-600">
                    Dedicated to global farming; advancing lasting impact in the
                    farming industry.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">What we do</h3>
                  <p className="text-gray-600">
                    Empowering agriculture with AI: Smart solutions for crop &
                    food quality assessment.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">How to help</h3>
                  <p className="text-gray-600">
                    Take action: Leave a comment about your experience with our
                    platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Where we work</h3>
                  <p className="text-gray-600">
                    Varied environments, varied approaches: Diverse strategies
                    for farms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 bg-white md:px-36">
          {/* Outer white box */}
          <div className="p-8 bg-green-100 border border-white rounded-lg md:p-16">
            <h2 className="text-3xl font-bold text-left">Stay Connected</h2>
            {/* Left-aligned title */}
            <p className="text-left text-gray-700">
              If you have any problem, please contact us.
            </p>
            {/* Flex container for the form and images */}
            <div className="flex flex-col justify-between gap-8 mt-6 md:flex-row">
              {/* Contact Form on the Left */}
              <div className="flex flex-col items-start w-full md:w-1/2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 text-gray-700 bg-green-100 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="Your message"
                  className="w-full h-24 p-2 mt-2 text-gray-700 bg-green-100 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <button className="px-4 py-2 mt-3 text-white bg-green-600 rounded hover:bg-green-700">
                  Submit
                </button>
              </div>

              {/* Right Section for Images */}
              <div className="flex w-full md:w-1/2">
                {/* Egg Image Section */}
                <div className="flex items-center justify-center ml-8">
                  <img
                    src={eggs}
                    alt="Eggs"
                    className="w-32 h-32 mr-4 rounded-lg shadow-md md:w-48 md:h-48"
                  />
                </div>

                {/* Soybeans and Crops Section (2 Rows) */}
                <div className="flex flex-col justify-start ml-auto space-y-4">
                  {/* Soybeans Image */}
                  <div className="flex justify-center">
                    <img
                      src={soybeans}
                      alt="Soybeans"
                      className="w-32 h-32 rounded-lg shadow-md md:w-48 md:h-48"
                    />
                  </div>

                  {/* Crops Image */}
                  <div className="flex justify-center">
                    <img
                      src={crops}
                      alt="Crops"
                      className="w-32 h-32 rounded-lg shadow-md md:w-48 md:h-48"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;