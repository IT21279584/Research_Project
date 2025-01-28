import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./Header.jsx";

import CornSeedsPrediction from "./CornSeedsPrediction.jsx";
import "../src/App.css";

import EggClassification from "./EggClassification.jsx";

import DiseaseDetection from "./RiceDiseasePrediction.jsx";
import SoybeanSeedsPrediction from "./SoybeanSeedsPrediction.jsx";
import Home from "./Home.jsx";

import GuavaClassification from "./GuavaClassification.jsx";
import TomatoClassification from "./TomatoClassification.jsx";

import BrownSpotDiagnosisResult from "./BrownSpotDiagnosisResult.jsx";
import BacterialLeafBlightDiagnosisResult from "./BacterialLeafBlightDiagnosisResult.jsx";
import LeafBlastDiagnosisResult from "./LeafBlastDiagnosisResult.jsx";
import DiseaseInstructions from "./DiseaseInstructions.jsx";

import BrownSpot from "./BrownSpot.jsx";
import LeafBlast from "./LeafBlast.jsx";
import BacterialLeafBlight from "./BacterialLeafBlight.jsx";
import CornSoybean from "./CornSoybean.jsx";
import TomatoGuawa from "./TomatoGuawa.jsx";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Profile from "./Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header and Footer routes  */}
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/header" element={<Header />}></Route>

        {/* Home Route */}
        <Route path="/" element={<Home />}></Route>

        {/* Classification Routes */}
        <Route path="/egg-classification" element={<EggClassification />} />
        <Route path="/corn-classification" element={<CornSeedsPrediction />} />
        <Route
          path="/soybean-classification"
          element={<SoybeanSeedsPrediction />}
        />
        <Route path="/rice-prediction" element={<DiseaseDetection />} />
        <Route path="/guava-classification" element={<GuavaClassification />} />
        <Route
          path="/tomato-classification"
          element={<TomatoClassification />}
        />

        <Route
          path="/brownspot-diagnosis-result"
          element={<BrownSpotDiagnosisResult />}
        ></Route>
        <Route
          path="/bacterial-diagnosis-result"
          element={<BacterialLeafBlightDiagnosisResult />}
        ></Route>
        <Route
          path="/leaf-blast-result"
          element={<LeafBlastDiagnosisResult />}
        ></Route>

        <Route path="/instructions" element={<DiseaseInstructions />} />

        <Route path="/brownspot" element={<BrownSpot />}></Route>

        <Route path="/leafblast" element={<LeafBlast />}></Route>
        <Route
          path="/bacterialleafblight"
          element={<BacterialLeafBlight />}
        ></Route>

        {/* Banner Routes */}
        <Route path="/corn-soybean" element={<CornSoybean />} />
        <Route path="/tomato-guawa" element={<TomatoGuawa />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
