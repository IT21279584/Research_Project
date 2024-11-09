import React, { useState, useEffect } from "react";
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

  
}

export default DiseaseDetection;
