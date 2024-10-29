import React, { useState } from "react";
import image1 from "./assets/corn.jpg";
import backgroundImage from "./assets/corn.jpg";
import Footer from "./Footer";
import Header from "./Header";

function CornSeedsPrediction() {
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);

  const onUploadImage1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage1(imageUrl);
    }
  };

  const onUploadImage2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage2(imageUrl);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center flex-grow w-full py-10">
        {/* Banner Section */}
        <div
          className="flex items-center justify-center w-full h-56 mb-8 bg-center bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="p-4 text-4xl font-bold text-white bg-opacity-50 rounded-lg">
            Corn Seeds Quality Prediction
          </h2>
        </div>

        <div className="w-full p-4 max-w-7xl md:p-2">
          {/* Analysis Result Section */}
          <div className="flex flex-col items-center pl-4 mb-8 space-y-4 md:flex-row md:space-y-0 md:justify-between">
            <div className="mb-4 text-center md:w-1/2 md:text-left md:mb-0">
              <h1 className="text-4xl font-bold leading-10 text-gray-800 md:text-7xl">
                The Corn Seed is Shows with{" "}
                <span className="leading-10 text-green-700">BROKEN SEED</span>
              </h1>
              <hr className="mt-10 mb-8 border-t border-gray-800" />
              <p className="mt-2 text-xl text-gray-600">
                The analysis indicates that the corn seed batch shows signs of
                Broken Seed, which may affect seed quality.
              </p>
            </div>
            <div className="flex justify-end space-x-4 md:w-1/2">
              <div className="flex items-center justify-center overflow-hidden bg-white border border-gray-300 rounded-lg w-60 h-60">
                <img
                  src={uploadedImage1 || image1}
                  alt="Brown Spot Disease"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center justify-center overflow-hidden bg-white border border-gray-300 rounded-lg w-60 h-60">
                <img
                  src={uploadedImage2 || image1}
                  alt="Brown Spot Disease"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons and Upload Sections */}
          <div className="flex flex-col justify-between p-4 mb-10 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col space-x-0 md:flex-row md:space-x-4">
              <button className="w-full px-8 py-2 mb-4 text-white bg-green-600 rounded-lg hover:bg-green-700 md:w-auto">
                Treatments
              </button>
              <button className="w-full px-8 py-2 mb-4 text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 md:w-auto">
                Read more
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <label className="w-full px-6 py-2 mb-4 text-center text-gray-800 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 md:w-auto">
                Upload Image 1
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onUploadImage1}
                />
              </label>
              <label className="w-full px-6 py-2 mb-4 text-center text-gray-800 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 md:w-auto">
                Upload Image 2
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onUploadImage2}
                />
              </label>
            </div>
          </div>

          {/* Previous Results */}
          <div className="h-auto">
            <h2 className="pl-4 mb-4 text-4xl font-bold text-gray-800">
              Previous Results
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 text-2xl font-semibold text-center"
                  >
                    <img
                      src={image1}
                      alt="Brown Spot Disease"
                      className="mb-2 rounded-lg shadow-md w-[100%] max-w-[300px] h-[auto] object-cover"
                    />
                    <p className="text-gray-700">Brown Spot</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default CornSeedsPrediction;
