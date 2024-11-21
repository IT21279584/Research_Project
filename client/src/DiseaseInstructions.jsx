import React, { useState } from "react";
import fish from "./assets/instructions/fish.jpeg";
import hen from "./assets/instructions/hen.jpeg";
import hand from "./assets/instructions/hand.jpeg";
import leg from "./assets/instructions/leg.jpeg";
import mask from "./assets/instructions/mask.jpeg";
import spec from "./assets/instructions/spec.jpeg";
import tap from "./assets/instructions/tap.jpeg";
import lock from "./assets/instructions/lock.jpeg";

import instructions from "./assets/instructions/instructions.png";
import fan from "./assets/instructions/fan.png";
import frequancy from "./assets/instructions/frequancy.png";
import interval from "./assets/instructions/interval.png";
import spray from "./assets/instructions/spray.png";
import wheather from "./assets/instructions/wheather.png";

import Header from "./Header";
import Footer from "./Footer";

const DiseaseInstructions = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [fieldArea, setFieldArea] = useState("");
  const [dosageRate, setDosageRate] = useState("");
  const [calculatedDosage, setCalculatedDosage] = useState(null);

    
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

  return (
    <div className="font-archivo">
      <Header />
      <div className="p-4 mx-8 md:mx-28 md:p-6">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-6">
          Edifenphos 50.0% EC
        </h1>
        <div className="p-6 bg-white rounded-lg shadow-md md:p-8">
          <div className="py-6 mt-8 ">
            <div className="flex items-center space-x-4">
              <img
                src={instructions}
                alt="Dosage Calculator"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <div>
                <h3 className="text-lg font-semibold md:text-xl">
                  Instructions for Application
                </h3>
                <p className="text-lg">Spray</p>
              </div>
            </div>
          </div>

          
};

export default DiseaseInstructions;
