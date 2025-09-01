import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Blog from "./pages/Blog";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Ruta blog */}
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
