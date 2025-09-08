import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PuntoDeVenta from "./Pages/PuntosDeVentas"
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
         {/* Ruta puntos de venta */}
        <Route path="/puntos-venta" element={<PuntoDeVenta />} />
      </Routes>
    </>
  );
}

export default App;
