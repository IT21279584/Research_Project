import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./Header.jsx";

import CornSeedsPrediction from "./CornSeedsPrediction.jsx";
import '../src/App.css'

import DiseaseDetection from "./RiceDiseasePrediction.jsx";
import SoybeanSeedsPrediction from "./SoybeanSeedsPrediction.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/header" element={<Header />}></Route>

        <Route
          path="/corn-prediction"
          element={<CornSeedsPrediction />}
        ></Route>
        <Route
          path="/soybean-prediction"
          element={<SoybeanSeedsPrediction />}
        ></Route>

        <Route path="/rice-prediction" element={<DiseaseDetection />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
