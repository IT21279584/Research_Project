import React from "react";
import { Link } from "react-router-dom"; // For internal navigation
import corn from "./assets/cornbanner.jpg";
import soybean from "./assets/soybeanbanner.jpg";
import seedsbanner from "./assets/seedbanner.jpg";
import Footer from "./Footer";
import Header from "./Header";

function CornSoybean() {
  return (
    <div className="font-archivo">
      <Header />
      <div className="bg-gray-100">
        {/* Banner */}
        
        <div className="relative w-full h-56 mb-8">
          {/* Background Image with Dark Overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${seedsbanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Dark Overlay */}
          </div>

          {/* Text Content */}
          <div className="relative flex items-center justify-center h-full">
            <h2 className="p-4 text-4xl font-bold text-white">
              Seed Quality Assessment{" "}
            </h2>
          </div>
        </div>

        <div className="max-w-screen-xl px-6 mx-auto">
          {/* Corn Section */}
          <div className="my-10">
            <Link to="/corn-classification">
              {" "}
              <div
                className="relative flex items-center justify-center overflow-hidden transition-transform duration-300 transform rounded-lg shadow-lg hover:scale-105"
                style={{ width: "100%", height: "300px" }}
              >
                <img
                  src={corn}
                  alt="Corn"
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white bg-black bg-opacity-50">
                  Corn
                </h2>
              </div>
            </Link>
          </div>

          {/* Soya Beans Section */}
          <div className="my-10">
            <Link to="/soybean-classification">
              {" "}
              <div
                className="relative flex items-center justify-center overflow-hidden transition-transform duration-300 transform rounded-lg shadow-lg hover:scale-105"
                style={{ width: "100%", height: "300px" }}
              >
                <img
                  src={soybean}
                  alt="Soya Beans"
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white bg-black bg-opacity-50">
                  SoyBeans
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CornSoybean;
