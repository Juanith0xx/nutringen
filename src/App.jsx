import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PuntoDeVenta from "./Pages/PuntosDeVentas"
import "./App.css";
import Contacto from "./Components/Contacto";
import WhatsAppBubble from "./Components/WhatsAppBubble";

function App() {
  return (
    <>
      <Navbar />
      <WhatsAppBubble />
      <Routes>
         {/* Ruta puntos de venta */}
        <Route path="/puntos-venta" element={<PuntoDeVenta />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default App;
