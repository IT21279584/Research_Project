import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
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
          <Route path="/about-us" element={<AboutUs />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/egg-classification"
            element={<ProtectedRoute element={<EggClassification />} />}
          />
          <Route
            path="/corn-classification"
            element={<ProtectedRoute element={<CornSeedsPrediction />} />}
          />
          <Route
            path="/soybean-classification"
            element={<ProtectedRoute element={<SoybeanSeedsPrediction />} />}
          />
          <Route
            path="/rice-prediction"
            element={<ProtectedRoute element={<DiseaseDetection />} />}
          />
          <Route
            path="/guava-classification"
            element={<ProtectedRoute element={<GuavaClassification />} />}
          />
          <Route
            path="/tomato-classification"
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
            path="/corn-soybean"
            element={<ProtectedRoute element={<CornSoybean />} />}
          />
          <Route
            path="/tomato-guawa"
            element={<ProtectedRoute element={<TomatoGuawa />} />}
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
