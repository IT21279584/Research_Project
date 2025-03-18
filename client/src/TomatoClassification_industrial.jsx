import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Header from "./Header";
import Footer from "./Footer";

function TomatoSeedDetection() {
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);
  const [latestTopPrediction, setLatestTopPrediction] = useState(null);
  const [latestBottomPrediction, setLatestBottomPrediction] = useState(null);
  const [chartDataTop, setChartDataTop] = useState([]);
  const [chartDataBottom, setChartDataBottom] = useState([]);
  const [images, setImages] = useState([]);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const Ref = ref(db, "tomato_predictions");
    onValue(Ref, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const sortedData = [...rawData].reverse();
        setData(sortedData);
        setLatestPrediction(sortedData[0]);

        const predictionCounts = sortedData.reduce((acc, item) => {
          acc[item.predicted_class] = (acc[item.predicted_class] || 0) + 1;
          return acc;
        }, {});

        const formattedChartData = Object.keys(predictionCounts).map((key) => ({
          prediction: key,
          count: predictionCounts[key],
        }));

        setChartDataTop(formattedChartData);
      }
    });
  }, []);



  useEffect(() => {
    const topRef = ref(db, "tomato_predictions_top");
    onValue(topRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const sortedData = [...rawData].reverse();
        setTopData(sortedData);
        setLatestTopPrediction(sortedData[0]);

        const predictionCounts = sortedData.reduce((acc, item) => {
          acc[item.predicted_class] = (acc[item.predicted_class] || 0) + 1;
          return acc;
        }, {});

        const formattedChartData = Object.keys(predictionCounts).map((key) => ({
          prediction: key,
          count: predictionCounts[key],
        }));

        setChartDataTop(formattedChartData);
      }
    });
  }, []);

  useEffect(() => {
    const bottomRef = ref(db, "tomato_predictions_bottom");
    onValue(bottomRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const sortedData = [...rawData].reverse();
        setBottomData(sortedData);
        setLatestBottomPrediction(sortedData[0]);

        const predictionCounts = sortedData.reduce((acc, item) => {
          acc[item.predicted_class] = (acc[item.predicted_class] || 0) + 1;
          return acc;
        }, {});

        const formattedChartData = Object.keys(predictionCounts).map((key) => ({
          prediction: key,
          count: predictionCounts[key],
        }));

        setChartDataBottom(formattedChartData);
      }
    });
  }, []);

  useEffect(() => {
    const imageRef = ref(db, "image_data");
    onValue(imageRef, (snapshot) => {
      if (snapshot.exists()) {
        const imageList = Object.values(snapshot.val());
        setImages(imageList.slice(0, 3));
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-archivo">
      <Header />

      <div className="flex flex-col items-center flex-grow w-full py-10">
        {/* Banner Section */}
        <div
          className="relative flex items-center justify-center w-full h-64 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/tomato.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative z-10 text-4xl font-bold text-center text-white">
            Tomato Quality Classification
          </h1>
        </div>

        {latestTopPrediction && images.length > 0 && (
          <div className="flex flex-col items-center w-full px-6 pt-10 mb-4 text-center md:flex-row md:px-24">
            <div className="pr-6 text-center md:w-1/2 md:text-left">
              <h1 className="text-4xl font-bold leading-10 text-gray-800 md:text-7xl">
                The Tomato is Classified as <br />
                <span className="text-green-700">
                  <p className="text-5xl font-bold text-green-700">
                    {latestTopPrediction.predicted_class
                      .charAt(0)
                      .toUpperCase() +
                      latestTopPrediction.predicted_class
                        .slice(1)
                        .toLowerCase()}
                  </p>
                </span>
              </h1>
            </div>
            <div className="flex flex-row justify-center space-x-4 md:justify-end md:w-1/2 md:pl-6">
              {latestTopPrediction && images.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${images[0]}`}
                  alt="Top Corn Seed"
                  className="object-cover w-64 h-64 rounded-lg md:w-80 md:h-80"
                />
              )}
              {latestBottomPrediction && images.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${images[1]}`}
                  alt="Bottom Corn Seed"
                  className="object-cover w-64 h-64 rounded-lg md:w-80 md:h-80"
                />
              )}
            </div>
          </div>
        )}

        <h2 className="w-full px-6 py-6 mb-4 text-4xl font-bold text-left text-gray-800 sm:px-24 md:px-24">
          Previous Results
        </h2>

        <div className="grid grid-cols-1 gap-6 px-6 mt-8 text-2xl sm:grid-cols-2 md:grid-cols-4 md:px-24">
          {images.slice(-2).map((img, index) => (
            <div key={`top-${index}`} className="flex flex-col items-center">
              <img
                src={`data:image/jpeg;base64,${img}`}
                alt={`Top Prediction Image ${index + 1}`}
                className="object-cover w-64 h-64 rounded-lg md:w-80 md:h-80"
              />
              <p className="mt-1 font-semibold text-left text-black">
                {topData[topData.length - 2 + index]?.predicted_class
                  ? topData[topData.length - 2 + index]?.predicted_class
                      .charAt(0)
                      .toUpperCase() +
                    topData[topData.length - 2 + index]?.predicted_class
                      .slice(1)
                      .toLowerCase()
                  : "Unknown"}
              </p>
            </div>
          ))}

          {images.slice(-2).map((img, index) => (
            <div key={`bottom-${index}`} className="flex flex-col items-center">
              <img
                src={`data:image/jpeg;base64,${img}`}
                alt={`Bottom Prediction Image ${index + 1}`}
                className="object-cover w-64 h-64 rounded-lg md:w-80 md:h-80"
              />
              <p className="mt-1 font-semibold text-left text-black">
                {bottomData[bottomData.length - 2 + index]?.predicted_class
                  ? bottomData[bottomData.length - 2 + index]?.predicted_class
                      .charAt(0)
                      .toUpperCase() +
                    bottomData[bottomData.length - 2 + index]?.predicted_class
                      .slice(1)
                      .toLowerCase()
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}

export default TomatoSeedDetection;