import React, { useState, useEffect } from "react";
import image1 from "./assets/cornseeds.jpg"; // Default image 1
import image2 from "./assets/cornseeds.jpg"; // Default image 2
import backgroundImage from "./assets/corn.jpg";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { BASE_URL_CORN } from "./constants";
import Swal from "sweetalert2";

function CornSeedsPrediction() {
  const [uploadedImages, setUploadedImages] = useState([image1, image2]);
  const [classificationResults, setClassificationResults] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [previousResults, setPreviousResults] = useState([]);

  const onUploadImages = (event) => {
    const newFiles = Array.from(event.target.files);

    if (newFiles.length === 0) {
      return;
    }

    const updatedFilesToUpload = [...filesToUpload, ...newFiles].slice(-2);
    const updatedUploadedImages = updatedFilesToUpload.map((file) =>
      URL.createObjectURL(file)
    );

    setFilesToUpload(updatedFilesToUpload);
    setUploadedImages(updatedUploadedImages);
  };

  const onAnalyze = async () => {
    if (filesToUpload.length === 0) {
      // Show a colorful modal alert
      await Swal.fire({
        title: "No Images Uploaded",
        text: "Please upload images before proceeding with analysis.",
        icon: "info", // Use 'info' for a more neutral tone
        background: "#ffffff", // Clean white background
        color: "#333", // Dark text color for readability
        confirmButtonColor: "#2c6b2f", // Dark green button for a professional look
        confirmButtonText: "OK",
        showCloseButton: true, // Show a close button for a cleaner look
        padding: "20px", // Add padding for spacing
      });
      return;
    }

    await uploadImages(filesToUpload);
  };
  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(
        `${BASE_URL_CORN}/api/corn-quality-classification`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { finalPrediction, results } = response.data;
      console.log("Data:", response.data);

      if (finalPrediction) {
        setClassificationResults({
          label: finalPrediction.label,
          confidence: finalPrediction.confidence,
          results,
        });
      } else {
        console.warn("No valid classifications received");
        setClassificationResults({
          label: "Unknown",
          confidence: 0,
          results: [],
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);

      await Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        background: "#ffffff", // Clean white background
        color: "#333", // Dark text color for readability
        confirmButtonColor: "#2c6b2f", // Dark green button for a professional look
        confirmButtonText: "OK",
        showCloseButton: true, // Show a close button for a cleaner look
        padding: "20px", // Add padding for spacing
      });
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${BASE_URL_CORN}/api/corn-previous-results`
        );
        const data = await response.json();
        setPreviousResults(data); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
    const intervalId = setInterval(fetchResults, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log("Updated Previous Results:", previousResults);
  }, [previousResults]); // This will log whenever previousResults state is updated

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-archivo">
      <Header />
      <div className="flex flex-col items-center flex-grow w-full py-10">
        {/* Banner Section */}
        <div className="relative w-full h-56 mb-8">
          {/* Background Image with Dark Overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${backgroundImage})`,
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
              Corn Seeds Quality Classification
            </h2>
          </div>
        </div>

        <div className="w-full p-4 max-w-7xl md:p-2">
          {/* Analysis Result Section */}
          <div className="flex flex-col items-center pl-4 mb-8 space-y-4 md:flex-row md:space-y-0 md:justify-between">
            <div className="mb-4 text-center md:w-1/2 md:text-left md:mb-0">
              <h1 className="text-4xl font-bold leading-10 text-gray-800 md:text-7xl">
                The Corn Seeds are Classified as{" "}
                <span className="text-6xl leading-10 text-green-700">
                  {classificationResults.label
                    ? classificationResults.label.charAt(0).toUpperCase() +
                      classificationResults.label.slice(1).toLowerCase()
                    : "Waiting for Result"}
                </span>
              </h1>
              <hr className="w-11/12 mt-10 mb-8 border-t border-gray-800" />
              <p className="mt-2 text-xl text-gray-600">
                The analysis indicates that the corn seed batch shows signs of{" "}
                <span className="">
                  {classificationResults.label || "unknown prediction"}
                </span>
                , which may affect seed quality.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:w-1/2">
              {uploadedImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-full overflow-hidden bg-white border border-gray-300 rounded-lg aspect-square"
                >
                  <img
                    src={imageUrl}
                    alt={`Uploaded Corn Seed ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 mb-10 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col space-x-0 md:flex-row md:space-x-4">
              <button
                className="w-full px-8 py-2 mb-4 text-white bg-green-600 rounded-lg hover:bg-green-700 md:w-auto"
                onClick={onAnalyze}
              >
                Analyze
              </button>
              <button className="w-full px-8 py-2 mb-4 text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 md:w-auto">
                Read more
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <label className="w-full px-6 py-2 mb-4 text-center text-gray-800 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 md:w-auto">
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onUploadImages}
                />
              </label>
            </div>
          </div>

          <div className="h-auto">
            <h2 className="pl-4 mb-4 text-4xl font-bold text-gray-800">
              Previous Results
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-2">
              {previousResults.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 text-2xl font-semibold text-center"
                >
                  <div className="flex flex-wrap justify-center gap-4">
                    {result.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Result ${index + 1} Image ${idx + 1}`}
                        className="object-cover w-48 h-48 rounded-lg sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-72 lg:w-72"
                      />
                    ))}
                  </div>
                  <p className="pt-4 text-black">
                    {result.finalPrediction.label &&
                      result.finalPrediction.label.charAt(0).toUpperCase() +
                        result.finalPrediction.label.slice(1)}{" "}
                    Corn Seed
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CornSeedsPrediction;
