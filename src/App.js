// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGallery from "./pages/ProductGallery";
import ProductViewer from "./pages/ProductViewer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductGallery />} />
        <Route path="/product/:id" element={<ProductViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
