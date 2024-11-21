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

 
};

export default DiseaseInstructions;
