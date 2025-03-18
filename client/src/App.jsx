import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./Header.jsx";

import CornSeedsPrediction from "./CornSeedsPrediction_industrial.jsx";
import "../src/App.css";

import EggClassification from "./EggClassification_industrial.jsx";
import DiseaseDetection from "./RiceDiseasePrediction_industrial.jsx";
import SoybeanSeedsPrediction from "./SoybeanSeedsPrediction_industrial.jsx";
import Home from "./Home.jsx";

import Home_Monitor from "./HomeIndustry.jsx";

import GuavaClassification from "./GuavaClassification_industrial.jsx";
import TomatoClassification from "./TomatoClassification_industrial.jsx";

import BrownSpotDiagnosisResult from "./BrownSpotDiagnosisResult.jsx";
import BacterialLeafBlightDiagnosisResult from "./BacterialLeafBlightDiagnosisResult.jsx";
import LeafBlastDiagnosisResult from "./LeafBlastDiagnosisResult.jsx";
import DiseaseInstructions from "./DiseaseInstructions.jsx";



import CornSeedsPrediction_2 from "./CornSeedsPrediction.jsx";
import EggClassification_2 from "./EggClassification.jsx";
import DiseaseDetection_2 from "./RiceDiseasePrediction.jsx";
import SoybeanSeedsPrediction_2 from "./SoybeanSeedsPrediction.jsx";
import GuavaClassification_2 from "./GuavaClassification.jsx";
import TomatoClassification_2 from "./TomatoClassification.jsx";



import BrownSpot from "./BrownSpot.jsx";
import LeafBlast from "./LeafBlast.jsx";
import BacterialLeafBlight from "./BacterialLeafBlight.jsx";
import CornSoybean from "./CornSoybean_industrial.jsx";
import TomatoGuawa from "./TomatoGuawa_industrial.jsx";

import CornSoybean_2 from "./CornSoybean.jsx";
import TomatoGuawa_2 from "./TomatoGuawa.jsx";


import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./NotFound.jsx"; // Import the 404 page
import AboutUs from "./AboutUs.jsx";

// 🛠️ Authentication Context
const AuthContext = createContext();

// 🎯 Custom Hook to Use Auth Context
const useAuth = () => useContext(AuthContext);

// 🔐 Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/sign-in" replace />;
};

// 🔑 Auth Provider
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // Check if token exists
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/footer" element={<Footer />} />
          <Route path="/header" element={<Header />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/monitor" element={<Home_Monitor />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* ✅ Protected Routes */}

          <Route
            path="/egg-classification"
            element={<ProtectedRoute element={<EggClassification_2 />} />}
          />
          <Route
            path="/corn-classification"
            element={<ProtectedRoute element={<CornSeedsPrediction_2 />} />}
          />
          <Route
            path="/soybean-classification"
            element={<ProtectedRoute element={<SoybeanSeedsPrediction_2 />} />}
          />
          <Route
            path="/rice-prediction"
            element={<ProtectedRoute element={<DiseaseDetection_2 />} />}
          />
          <Route
            path="/guava-classification"
            element={<ProtectedRoute element={<GuavaClassification_2 />} />}
          />
          <Route
            path="/tomato-classification"
            element={<ProtectedRoute element={<TomatoClassification_2 />} />}
          />

          <Route
            path="/egg-classification-industrial"
            element={<ProtectedRoute element={<EggClassification />} />}
          />
          <Route
            path="/corn-classification-industrial"
            element={<ProtectedRoute element={<CornSeedsPrediction />} />}
          />
          <Route
            path="/soybean-classification-industrial"
            element={<ProtectedRoute element={<SoybeanSeedsPrediction />} />}
          />
          <Route
            path="/rice-prediction-industrial"
            element={<ProtectedRoute element={<DiseaseDetection />} />}
          />
          <Route
            path="/guava-classification-industrial"
            element={<ProtectedRoute element={<GuavaClassification />} />}
          />
          <Route
            path="/tomato-classification-industrial"
            element={<ProtectedRoute element={<TomatoClassification />} />}
          />

          <Route
            path="/brownspot-diagnosis-result"
            element={<ProtectedRoute element={<BrownSpotDiagnosisResult />} />}
          />
          <Route
            path="/bacterial-diagnosis-result"
            element={
              <ProtectedRoute
                element={<BacterialLeafBlightDiagnosisResult />}
              />
            }
          />
          <Route
            path="/leaf-blast-result"
            element={<ProtectedRoute element={<LeafBlastDiagnosisResult />} />}
          />
          <Route
            path="/instructions"
            element={<ProtectedRoute element={<DiseaseInstructions />} />}
          />
          <Route
            path="/brownspot"
            element={<ProtectedRoute element={<BrownSpot />} />}
          />
          <Route
            path="/leafblast"
            element={<ProtectedRoute element={<LeafBlast />} />}
          />
          <Route
            path="/bacterialleafblight"
            element={<ProtectedRoute element={<BacterialLeafBlight />} />}
          />

          <Route
            path="/corn-soybean-industrial"
            element={<ProtectedRoute element={<CornSoybean />} />}
          />

          <Route
            path="/corn-soybean"
            element={<ProtectedRoute element={<CornSoybean_2 />} />}
          />

          <Route
            path="/tomato-guawa-industrial"
            element={<ProtectedRoute element={<TomatoGuawa />} />}
          />

          <Route
            path="/tomato-guawa"
            element={<ProtectedRoute element={<TomatoGuawa_2 />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />

          {/* ❌ Catch All Undefined Routes - Redirect to 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
