import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase"; // Import Firebase Database
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "./assets/background.jpg"; // Import the background image

function DiseaseDetection() {
  const [data, setData] = useState([]);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [mostFrequentPrediction, setMostFrequentPrediction] = useState("");
  const [chartData, setChartData] = useState([]);
  const [images, setImages] = useState([]);

  // Fetch Rice Disease Data from Firebase
  useEffect(() => {
    const riceRef = ref(db, "rice_disease_predictions");
    onValue(riceRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();

        // Sort by latest data
        const sortedData = [...rawData].reverse();
        setData(sortedData);
        setLatestPrediction(sortedData[0]); // Latest entry

        // Determine most frequent prediction
        const predictionCounts = sortedData.reduce((acc, item) => {
          acc[item.prediction] = (acc[item.prediction] || 0) + 1;
          return acc;
        }, {});

        const mostFrequent = Object.keys(predictionCounts).reduce((a, b) =>
          predictionCounts[a] > predictionCounts[b] ? a : b
        );

        setMostFrequentPrediction(mostFrequent);

        // Format data for chart
        const formattedChartData = Object.keys(predictionCounts).map((key) => ({
          prediction: key,
          count: predictionCounts[key],
        }));

        setChartData(formattedChartData);
      }
    });
  }, []);

  // Fetch Base64 Images from Firebase
  useEffect(() => {
    const imageRef = ref(db, "image_data");
    onValue(imageRef, (snapshot) => {
      if (snapshot.exists()) {
        const imageList = Object.values(snapshot.val()); // Convert object to array
        setImages(imageList.slice(0, 3)); // Get first 3 images
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-archivo">
      <Header />

      <div className="flex flex-col items-center flex-grow w-full py-10">
        {/* Hero Section */}
        <div className="relative w-full h-56 mb-8">
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
          <div className="relative flex items-center justify-center h-full">
            <h2 className="p-4 text-4xl font-bold text-white">
              Rice Leaf Disease Detection
            </h2>
          </div>
        </div>

        {/* Latest Prediction Section */}
        {latestPrediction && images.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-12 p-8 mb-8 max-w-7xl md:grid-cols-2">
            {/* Left - Text Content */}
            <div className="flex flex-col justify-center max-w-2xl">
              <h1 className="text-5xl font-bold leading-tight text-gray-800 md:text-7xl">
                The Plant is Infected with{" "}
                <span className="text-green-700 text-6xl">
                  {latestPrediction.prediction
                    ? latestPrediction.prediction.charAt(0).toUpperCase() +
                      latestPrediction.prediction.slice(1).toLowerCase()
                    : "Unknown"}
                </span>
              </h1>
              <hr className="mt-6 mb-4 border-t border-gray-800" />
              <p className="text-xl text-gray-600">
                By analyzing the image you uploaded, the algorithm has
                identified that the plant is infected with{" "}
                <span className="font-semibold">
                  {latestPrediction.prediction
                    ? latestPrediction.prediction.charAt(0).toUpperCase() +
                      latestPrediction.prediction.slice(1).toLowerCase()
                    : "Unknown"}
                </span>
                .
              </p>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center">
              <img
                src={`data:image/jpeg;base64,${images[0]}`}
                alt="Latest Prediction"
                className="object-cover rounded-lg w-96 h-96"
              />
            </div>
          </div>
        )}

        {/* Previous Results Section - FULLY CENTERED */}
        {/* Previous Results Section - FULLY CENTERED */}
        <div className="w-full px-8 mx-auto max-w-7xl">
          {/* Left-Aligned Topic Title */}
          <h2 className="mb-6 text-4xl font-bold text-gray-800">
            Previous Results
          </h2>

          {/* Centered Images Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-fit">
              {images.map((img, index) => (
                <div key={index} className="w-full">
                  <img
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`Prediction Image ${index + 1}`}
                    className="object-cover w-full rounded-lg h-80"
                  />
                  <p className="mt-2 text-lg font-semibold text-center text-gray-700">
                    {data[index]?.prediction
                      ? data[index]?.prediction.charAt(0).toUpperCase() +
                        data[index]?.prediction.slice(1).toLowerCase()
                      : "Unknown"}
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
