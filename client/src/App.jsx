import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./Header.jsx";

import CornSeedsPrediction from "./CornSeedsPrediction.jsx";
import '../src/App.css'
import EggClassification from "./EggClassification.jsx";

import DiseaseDetection from "./RiceDiseasePrediction.jsx";
import SoybeanSeedsPrediction from "./SoybeanSeedsPrediction.jsx";
import Home from "./Home.jsx";
import GuavaClassification from "./GuavaClassification.jsx";
import TomatoClassification from "./TomatoClassification.jsx";

import DiagnosisResult from "./DiagnosisResult.jsx";
import DiseaseInstructions from "./DiseaseInstructions.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/header" element={<Header />}></Route>

        <Route
          path="/egg-classification"
          element={<EggClassification />}
        ></Route>

        <Route
          path="/corn-classification"
          element={<CornSeedsPrediction />}
        ></Route>
        <Route
          path="/soybean-classification"
          element={<SoybeanSeedsPrediction />}
        ></Route>

        <Route path="/rice-prediction" element={<DiseaseDetection />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route
          path="/guava-classification"
          element={<GuavaClassification />}
        ></Route>
        <Route path="/diagnosis-result" element={<DiagnosisResult />}></Route>
        <Route
          path="/diagnosis-instructions"
          element={<DiseaseInstructions />}
        ></Route>
        <Route
          path="/tomato-classification"
          element={<TomatoClassification />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
