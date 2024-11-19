import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import rice from "./assets/rice.png"

const DiagnosisResult = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-10 mx-auto my-10 sm:px-12 lg:px-20">
        {/* Diagnosis Result Section */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-bold">Diagnosis Result</h2>
          <div className="flex items-center">
            <img
              src={rice} // Replace with actual image URL
              alt="Brown Spot"
              className="object-cover rounded-lg h-36 w-36"
            />
            <div className="ml-6">
              <h3 className="text-xl font-semibold">Brown Spot</h3>
              <p className="text-gray-500">Fungus</p>
              
            </div>
          </div>
        </div>

        
};

export default DiagnosisResult;
