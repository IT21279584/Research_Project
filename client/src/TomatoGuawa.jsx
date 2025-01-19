import React from "react";
import { Link } from "react-router-dom"; // For internal navigation
import corn from "./assets/cornbanner.jpg";
import soybean from "./assets/soybeanbanner.jpg";
import seedsbanner from "./assets/seedbanner.jpg";
import Footer from "./Footer";
import Header from "./Header";

function TomatoGuawa() {
  return (
    <div className="font-archivo">
      <Header />
      <div className="bg-gray-100">
        {/* Banner */}
        <div
          className="flex items-center justify-center w-full h-56 text-white bg-center bg-cover"
          style={{
            backgroundImage: `url(${seedsbanner})`,
          }}
        >
          <h1 className="text-4xl font-bold">Fruits Quality Assessment</h1>
        </div>

        <div className="max-w-screen-xl px-6 mx-auto">
          {/* Tomato Section */}
          <div className="my-10">
            <Link to="/tomato-classification">
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
                  Tomato
                </h2>
              </div>
            </Link>
          </div>

          {/* Guava Section */}
          <div className="my-10">
            <Link to="/guava-classification">
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
                  Guava
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

export default TomatoGuawa;
