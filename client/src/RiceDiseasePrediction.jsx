import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import image1 from "./assets/rice.png";
import backgroundImage from "./assets/background.jpg"; // Import the background image
import Footer from "./Footer"; // Import the Footer component
import Header from "./Header";

function DiseaseDetection() {
  const [uploadedImage, setUploadedImage] = useState(null); // To display the uploaded image
  const [prediction, setPrediction] = useState(""); // Store the prediction result
  const [previousResults, setPreviousResults] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Store the uploaded file

  // Fetch previous results from the backend
  useEffect(() => {
    const fetchPreviousResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5008/api/rice-previous-predictions"
        );
        console.log("Fetched Previous Results: ", response.data); // Log to verify the data
        setPreviousResults(response.data);
      } catch (error) {
        console.error("Error fetching previous results:", error);
      }
    };

    fetchPreviousResults();

    const intervalId = setInterval(() => {
      fetchPreviousResults();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle image upload and set it as the uploadedImage state
  const onUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl); // Set the uploaded image to be displayed
      setImageFile(file); // Store the file for later upload
    }
  };

  // Handle analysis when the "Analyze" button is clicked
  const onAnalyze = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    // Create FormData to send the image to the server
    const formData = new FormData();
    formData.append("images", imageFile);

    try {
      // Send image to backend API (Flask or Express)
      const response = await axios.post(
        "http://localhost:5008/api/rice-disease-predictions", // Update to the appropriate API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Save Data ", response.data.prediction[0]);

      // Set the prediction state with the response data
      if (
        response.data &&
        response.data.prediction &&
        response.data.prediction[0]
      ) {
        setPrediction(response.data.prediction[0]); // Update prediction with the first element of prediction array
      } else {
        setPrediction("No prediction available.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setPrediction("Error in prediction");
    }
  };

  const navigate = useNavigate();

  // Function to handle "Treatments" button click
  const onTreatmentClick = () => {
    if (prediction === "Brown Spot") {
      navigate("/brownspot-diagnosis-result");
    } else if (prediction === "Leaf Blast") {
      navigate("/leaf-blast-result");
    } else if (prediction === "Bacterial Leaf Blight") {
      navigate("/bacterial-diagnosis-result");
    }
  };

  // Function to handle "ReadMore" button click
  const onReadMoreClick = () => {
    if (prediction === "Brown Spot") {
      navigate("/brownspot");
    } else if (prediction === "Leaf Blast") {
      navigate("/leafblast");
    } else if (prediction === "Bacterial Leaf Blight") {
      navigate("/bacterialleafblight");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-archivo">
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
            Rice Leaf Disease Detection
          </h2>
        </div>

        <div className="w-full p-4 max-w-7xl md:p-2">
          {/* Analysis Result Section */}
          <div className="flex flex-col items-center pl-4 mb-8 md:flex-row md:justify-between">
            <div className="mb-4 text-center md:w-1/2 md:text-left md:mb-0">
              <h1 className="text-4xl font-bold leading-10 text-gray-800 md:text-7xl ">
                The Plant is Infected with{" "}
                <span className="leading-10 text-green-700">
                  {prediction ? prediction : "Waiting for Result"}
                </span>
              </h1>
              <hr className="mt-10 mb-8 border-t border-gray-800" />
              <p className="mt-2 text-xl text-gray-600">
                By analyzing the image you have uploaded, the algorithm has
                identified that the plant is infected with the disease called{" "}
                <span>{prediction ? prediction : "Waiting for result"}</span>
              </p>
            </div>
            <div className="flex justify-end p-4 md:w-1/2">
              <img
                src={uploadedImage || image1} // Use uploadedImage or default image
                alt="Disease Prediction"
                className="mb-4 rounded-lg shadow-md h-96 w-96"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-between p-4 mb-10 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col space-x-0 md:flex-row md:space-x-4">
              <button
                onClick={onTreatmentClick}
                className={`w-full px-8 py-2 mb-4 text-white bg-green-600 rounded-lg hover:bg-green-700 md:w-auto ${
                  !prediction ||
                  (prediction !== "Brown Spot" &&
                    prediction !== "Leaf Blast" &&
                    prediction !== "Bacterial Leaf Blight")
                    ? "hidden"
                    : ""
                }`}
              >
                Treatments
              </button>
              <button
                onClick={onTreatmentClick}
                className={`w-full px-8 py-2 mb-4 text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-200 md:w-auto ${
                  !prediction ||
                  (prediction !== "Brown Spot" &&
                    prediction !== "Leaf Blast" &&
                    prediction !== "Bacterial Leaf Blight")
                    ? "hidden"
                    : ""
                }`}
              >
                Read more
              </button>
            </div>
            <div className="flex flex-col space-x-0 md:flex-row md:space-x-4">
              <button
                onClick={onAnalyze}
                className="w-full px-8 py-2 mb-4 text-white bg-green-600 rounded-lg hover:bg-green-700 md:w-auto"
              >
                Analyze
              </button>
              {/* File input for uploading an image */}
              <label className="w-full px-6 py-2 mb-4 text-center text-gray-800 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 md:w-auto">
                Upload an image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onUploadImage}
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
              {previousResults.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 text-2xl font-semibold text-center"
                >
                  {/* Render image */}
                  <img
                    src={
                      result.images && result.images.length > 0
                        ? result.images[0]
                        : image1
                    }
                    alt="Rice Disease"
                    className="mb-2 rounded-lg shadow-md w-full h-[300px] object-cover"
                  />

                  {/* Render prediction */}
                  <p className="text-gray-700">
                    {result.predictions && result.predictions.length > 0
                      ? result.predictions[0]
                      : "No prediction available"}
                  </p>
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

export default DiseaseDetection;
