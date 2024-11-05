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

  
}

export default DiseaseDetection;
