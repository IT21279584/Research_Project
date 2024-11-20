import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "./Header.jsx";
import CornSeedsPrediction from "./CornSeedsPrediction.jsx";
import '../src/App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/header" element={<Header />}></Route>
        <Route path="/corn-prediction" element={<CornSeedsPrediction/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
