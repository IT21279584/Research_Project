import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
