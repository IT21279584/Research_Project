import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import fish from "./assets/instructions/fish.jpeg";
import hen from "./assets/instructions/hen.jpeg";
import hand from "./assets/instructions/hand.jpeg";
import leg from "./assets/instructions/leg.jpeg";
import mask from "./assets/instructions/mask.jpeg";
import spec from "./assets/instructions/spec.jpeg";
import tap from "./assets/instructions/tap.jpeg";
import lock from "./assets/instructions/lock.jpeg";

import instructions from "./assets/instructions/instructions.png";
import spray from "./assets/instructions/spray.png";
import wheather from "./assets/instructions/wheather.png";

import Header from "./Header";
import Footer from "./Footer";



import fan from "./assets/instructions/fan.png";
import frequancy from "./assets/instructions/frequancy.png";
import interval from "./assets/instructions/interval.png";
import weather from "./assets/instructions/wheather.png";



const SafetyPrecautions = ({ items }) => (
  <div className="py-6 mt-8 border-t border-gray-300">
    <h3 className="mb-8 text-2xl font-semibold">Safety Precautions</h3>
    <ul className="space-y-4 text-lg list-none">
      {items.map(({ img, text }, index) => (
        <li key={index} className="flex items-center space-x-4">
          <img src={img} alt={text} className="w-16 h-16 md:w-20 md:h-20" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Section = ({ title, imgSrc, description, extraContent }) => (
  <div className="py-6 mt-8">
    <div className="flex items-center space-x-4">
      <img src={imgSrc} alt={title} className="w-10 h-10 md:w-12 md:h-12" />
      <div>
        <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
        <p className="text-lg">{description}</p>
        {extraContent && <div>{extraContent}</div>}
      </div>
    </div>
  </div>
);

const DiseaseInstructions = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [fieldArea, setFieldArea] = useState("");
  const [dosageRate, setDosageRate] = useState("");
  const [calculatedDosage, setCalculatedDosage] = useState(null);

  const location = useLocation();
  const treatment = location.state?.treatment || "Treatment Instructions"; // Default title

  const safetyItems = [
    { img: lock, text: "Keep it locked away and out of reach of children." },
    { img: mask, text: "Wear protection over nose and mouth." },
    { img: spec, text: "Wear eye protection." },
    { img: leg, text: "Wear long rubber boots." },
    { img: hand, text: "Wear long rubber gloves." },
    {
      img: tap,
      text: "Wash hands and face with clean water after usage.",
    },
    { img: hen, text: "Dangerous and harmful to animals." },
    { img: fish, text: "Contaminates water and fish." },
  ];

  const [areaSize, setAreaSize] = useState(1); // Numeric input for area size
  const [areaUnit, setAreaUnit] = useState("acre"); // Radio button for area unit
  const [pumpSize, setPumpSize] = useState("small"); // Radio button for pump size

  // Function to handle numeric input changes
  const incrementAreaSize = () => setAreaSize((prev) => prev + 1);
  const decrementAreaSize = () =>
    setAreaSize((prev) => (prev > 1 ? prev - 1 : 1));

  const handleCalculateDosageClick = () => setShowCalculator(true);

  const closeModal = () => setShowCalculator(false);

  const handleDosageCalculation = (e) => {
    e.preventDefault();
    if (fieldArea && dosageRate) {
      setCalculatedDosage(fieldArea * dosageRate);
    }
  };

  const [toxicityMessage, setToxicityMessage] = useState({
    title: "Highly toxic",
    description:
      "Always stick to safety precautions to mitigate the risk of dangerous chemical exposures.",
    colorClass: "text-red-600", // Default color is red
  });

  // Check if the page came from 'Bacteria disease.jsx' and update toxicity
  useEffect(() => {
    if (location.state?.fromBacteriaDisease) {
      setToxicityMessage({
        title: "Slightly  toxicity",
        description:
          "Always stick to safety precautions to mitigate the risk of dangerous chemical exposures.",
        colorClass: "text-green-600", // Change color to green for low toxicity
      });
    }
  }, [location]);

  return (
    <div className="font-archivo">
      <Header />
      <div className="p-4 mx-8 md:mx-28 md:p-6">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-6">
          {treatment}
        </h1>

        <div className="p-6 bg-white rounded-lg shadow-md md:p-8">
          <Section
            title="Instructions for Application"
            imgSrc={instructions}
            description="Spray"
          />
          <div className="p-6 mx-auto border rounded-lg shadow-sm max-w-8xl">
            <h2 className="mb-4 text-xl font-semibold">Dosage Calculator</h2>
            <p className="mb-6 text-gray-700">
              Using this calculator you can get the exact dosage, dilution,
              application frequency, and pre-harvest interval for your plot.
              Make sure to input the requested details accurately. Incorrect
              inputs can cause damage to the crop by changing the dosage.
            </p>
            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-green-800 rounded-lg hover:bg-green-900"
                onClick={handleCalculateDosageClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 6H8m1 10h2m4 0h2m-6 2H9m8 0h-2m-4-4h6m-6 0H9"
                  />
                </svg>
                Calculate Dosage
              </button>
            </div>
          </div>

          <Section
            title="Application Method"
            imgSrc={spray}
            description="Spray"
          />
          <Section
            title="Weather Conditions"
            imgSrc={weather}
            description="Do not apply product if it is windy or raining. Avoid
            application during the hottest hours of the day."
          />
          <Section
            title="Toxicity"
            imgSrc={fan}
            description={
              <>
                <p
                  className={`text-lg font-bold ${toxicityMessage.colorClass}`}
                >
                  {toxicityMessage.title}
                </p>
                <p className="text-lg text-gray-600">
                  {toxicityMessage.description}
                </p>
              </>
            }
          />

          <SafetyPrecautions items={safetyItems} />
        </div>
      </div>
      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
            {/* Close Button with X Sign */}
            <div className="absolute top-4 right-4">
              <button
                onClick={closeModal}
                className="text-2xl text-gray-600 hover:text-gray-900"
              >
                &times; {/* This is the "X" symbol */}
              </button>
            </div>

            <h4 className="mb-6 text-2xl font-semibold text-center">
              Dosage Calculator
            </h4>

            {/* Numeric Input Panel for Area Size */}
            <div className="flex items-center justify-center mb-6 space-x-4">
              <button
                onClick={decrementAreaSize}
                className="p-2 text-xl bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={areaSize}
                readOnly
                className="w-20 p-2 text-center border border-gray-300 rounded"
              />
              <button
                onClick={incrementAreaSize}
                className="p-2 text-xl bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Radio Buttons for Area Unit */}
            <div className="mb-6">
              <p className="mb-2 text-lg font-medium text-gray-700">
                Select Area Unit:
              </p>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="areaUnit"
                    value="acre"
                    checked={areaUnit === "acre"}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Acre</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="areaUnit"
                    value="hectare"
                    checked={areaUnit === "hectare"}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Hectare</span>
                </label>
              </div>
            </div>

            {/* Radio Buttons for Pump Size */}
            <div className="mb-6">
              <p className="mb-2 text-lg font-medium text-gray-700">
                Select Pump Size:
              </p>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="pumpSize"
                    value="NoPump"
                    checked={pumpSize === "NoPump"}
                    onChange={(e) => setPumpSize(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">No pump</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="pumpSize"
                    value="15liters"
                    checked={pumpSize === "15liters"}
                    onChange={(e) => setPumpSize(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">15 Liters</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="pumpSize"
                    value="20liters"
                    checked={pumpSize === "20liters"}
                    onChange={(e) => setPumpSize(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">20 Liters</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="pumpSize"
                    value="25liters"
                    checked={pumpSize === "25liters"}
                    onChange={(e) => setPumpSize(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">25 Liters</span>
                </label>
              </div>
            </div>

            {/* Calculate Dosage Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  // Refill times constants
                  const refillTimes = {
                    acre: {
                      NoPump: 0,
                      "15liters": 13.5,
                      "20liters": 10.5,
                      "25liters": 8.5,
                    },
                    hectare: {
                      NoPump: 0,
                      "15liters": 33.5,
                      "20liters": 25,
                      "25liters": 20,
                    },
                  };

                  // Calculate refill times
                  const fixedRefill = refillTimes[areaUnit][pumpSize] || 0;
                  const totalRefillTimes = fixedRefill * areaSize;

                  // Display result
                  alert(
                    `For ${areaSize} ${areaUnit}(s) using ${pumpSize} pump: ${totalRefillTimes} refill times.`
                  );
                }}
                className="px-6 py-3 text-lg text-white bg-green-600 rounded shadow-md md:px-8 md:py-4 hover:bg-green-700"
              >
                Calculate Dosage
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DiseaseInstructions;
