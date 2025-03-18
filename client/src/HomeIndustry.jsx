import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import rice from "./assets/rice.jpg";
import soybean from "./assets/soybean-corn.jpg";
import fruit from "./assets/fruits.jpg";
import egg from "./assets/egg.jpg";

const IndustrialHome = () => {
  const navigate = useNavigate();

  // Define the evaluation options with images
  const services = [
    {
      title: "Rice Disease Detection",
      route: "/rice-prediction-industrial",
      description:
        "Evaluate rice leaf diseases with our advanced detection system.",
      image: rice,
    },
    {
      title: "Corn & Soybean Quality Classification",
      route: "/corn-soybean-industrial",
      description:
        "Assess the quality of corn seeds and soybean seeds for optimal yield.",
      image: soybean,
    },
    {
      title: "Fruits & Vegetables Quality Classification",
      route: "/tomato-guawa-industrial",
      description:
        "Analyze gava and tomato quality using our deep learning classification technology.",
      image: fruit,
    },
    {
      title: "Egg Quality Classification",
      route: "/egg-classification-industrial",
      description: "Determine egg quality with our precise evaluation tools.",
      image: egg,
    },
  ];

  return (
    <div className="min-h-screen font-sans text-black ">
      <Header />
      {/* <div className="absolute z-10 top-4 right-40">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 text-white bg-gray-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Home
        </button>
      </div> */}
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-8 text-5xl font-bold">Industrial Analysis Portal</h1>
        <p className="mb-12 text-xl">
          Select an evaluation option to analyze results.
        </p>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden transition duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-56"
              />
              {/* Text container with background effect */}
              <div className="flex flex-col flex-grow p-6  bg-white rounded-b-lg">
                <h2 className="mb-4 text-3xl font-bold">{service.title}</h2>
                <p className="flex-grow mb-6">{service.description}</p>
                <button
                  onClick={() => navigate(service.route)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Analyze Results
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndustrialHome;