import React, { useState, useEffect } from "react";
import image1 from "./assets/corn.jpg"; // Default image 1
import image2 from "./assets/corn.jpg"; // Default image 2
import backgroundImage from "./assets/corn.jpg";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

function CornSeedsPrediction() {
  // State to manage uploaded images and classification results
  const [uploadedImages, setUploadedImages] = useState([image1, image2]); // Initialize with default images
  const [classificationResults, setClassificationResults] = useState([]); // Store results of current predictions
  const [filesToUpload, setFilesToUpload] = useState([]); // State to hold files for classification
  const [previousResults, setPreviousResults] = useState([]); // Store previous results

  const onUploadImages = (event) => {
    const newFiles = Array.from(event.target.files);
    let updatedFilesToUpload = [...filesToUpload];
    let updatedUploadedImages = []; // Clear default images on upload

    // Loop through new files and update the uploadedImages array
    newFiles.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);

      if (updatedFilesToUpload.length >= 2) {
        updatedFilesToUpload.shift(); // Remove the oldest file
      }

      updatedFilesToUpload.push(file);
      updatedUploadedImages.push(imageUrl); // Update uploaded images
    });

    setFilesToUpload(updatedFilesToUpload);
    setUploadedImages(updatedUploadedImages); // Set the uploaded images (empty default images)
  };

  const onAnalyze = async () => {
    if (filesToUpload.length === 0) {
      alert("Please upload images before analysis.");
      return;
    }

    await uploadImages(filesToUpload);
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post(
        "http://localhost:5000/classify",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response received:", response);

      const { classification, confidence } = response.data;

      // Check if classification and confidence are present
      if (classification && confidence) {
        setClassificationResults([...classificationResults, classification]); // Add to existing results
      } else {
        console.warn("No valid classifications received");
        setClassificationResults([...classificationResults, "Unknown"]); // Fallback result
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error during classification. Please try again.");
    }
  };

  // Fetch previous results every 5 seconds
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:5000/previous-results");
        const data = await response.json();
        setPreviousResults(data); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    // Initial fetch
    fetchResults();

    // Set an interval to refresh the data every 3 seconds
    const intervalId = setInterval(fetchResults, 3000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    console.log("Updated Previous Results:", previousResults);
  }, [previousResults]); // This will log whenever previousResults state is updated

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
        The Corn Seeds are Classified as{" "}
        <span className="leading-10 text-green-700">
          {classificationResults.length
            ? classificationResults.join(", ")
            : "Unknown"}
        </span>
      </h1>
      <hr className="mt-10 mb-8 border-t border-gray-800" />
      <p className="mt-2 text-xl text-gray-600">
        The analysis indicates that the corn seed batch shows signs of{" "}
        {classificationResults.length
          ? classificationResults.join(", ")
          : "unknown condition"}
        , which may affect seed quality.
      </p>
    </div>
    {/* Responsive Image Section */}
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


          {/* Action Buttons and Upload Section */}
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
                  multiple // Allow multiple files to be selected
                  className="hidden"
                  onChange={onUploadImages}
                />
              </label>
            </div>
          </div>

          {/* Previous Results */}
          <div className="h-auto">
            <h2 className="pl-4 mb-4 text-4xl font-bold text-gray-800">
              Previous Results
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-2">
              {/* Check if `previousResults` contains the required structure */}
              {Array.isArray(previousResults) &&
                previousResults.map((record, recordIndex) => (
                  <div
                    key={recordIndex}
                    className="flex flex-col items-center p-4 text-2xl font-semibold text-center"
                  >
                    <div className="flex flex-wrap justify-center gap-4">
                      {/* Render all images for a single record */}
                      {Array.isArray(record.images) &&
                        record.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Record ${recordIndex + 1} - Image ${
                              index + 1
                            }`}
                            className="object-cover w-48 h-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-72 lg:w-72"
                          />
                        ))}
                    </div>
                    <div className="mt-4">
                      <span>
                        {" "}
                        {record.highestClassification
                          ? record.highestClassification
                          : "Unknown"}
                      </span>
                    </div>
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
