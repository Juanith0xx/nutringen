import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const regiones = ["Santiago", "Sucursales en Regiones"];

function FlyToStore({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

export default function PuntoDeVenta() {
  const [stores, setStores] = useState([]); // 🔹 ahora dinámico desde MongoDB
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedComuna, setSelectedComuna] = useState("");
  const [flyToPosition, setFlyToPosition] = useState(null);

  // 🔹 Traer datos desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/api/stores") // Cambia a tu URL de producción si despliegas
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => console.error("Error cargando sucursales:", err));
  }, []);

  // Filtramos comunas según la opción seleccionada
  const comunas = Array.from(
    new Set(
      stores
        .filter((store) => {
          if (selectedRegion === "Santiago") return store.region === "Región Metropolitana";
          if (selectedRegion === "Sucursales en Regiones") return store.region !== "Región Metropolitana";
          return false;
        })
        .map((store) => store.comuna)
    )
  );

  // Filtramos puntos de venta
  const filteredStores = stores.filter((store) => {
    if (selectedRegion === "Santiago") {
      return store.region === "Región Metropolitana" && (!selectedComuna || store.comuna === selectedComuna);
    }
    if (selectedRegion === "Sucursales en Regiones") {
      return store.region !== "Región Metropolitana" && (!selectedComuna || store.comuna === selectedComuna);
    }
    return false;
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar con filtros */}
      <div className="w-full md:w-1/3 bg-white shadow-lg p-4 pt-40 overflow-y-auto">
        <h2 className="text-2xl font-medium underline decoration-[#2E7D32] mb-4">Puntos de Venta</h2>

        {/* Select Región */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Región</label>
          <select
            className="w-full text-[#2E7D32] border-2 border-[#2E7D32] rounded-md px-3 py-2 font-semibold transition-all duration-300 hover:bg-[#007A33] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007A33] focus:border-[#007A33]"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedComuna("");
              setFlyToPosition(null);
            }}
          >
            <option value="">-- Selecciona una opción --</option>
            {regiones.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Select Comuna */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Comuna</label>
          <select
            className="w-full border rounded p-2"
            value={selectedComuna}
            onChange={(e) => {
              setSelectedComuna(e.target.value);
              setFlyToPosition(null);
            }}
            disabled={!selectedRegion}
          >
            <option value="">-- Selecciona una comuna --</option>
            {comunas.map((comuna) => (
              <option key={comuna} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de Puntos de Venta */}
        <ul className="space-y-3">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <li key={store._id} className="border-b pb-2">
                <h3
                  className="text-lg font-semibold cursor-pointer text-[#2E7D32] hover:underline"
                  onClick={() => setFlyToPosition(store.position)}
                >
                  {store.name}
                </h3>
                <p className="text-sm text-gray-600">{store.address}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Selecciona una opción para ver los puntos de venta.</p>
          )}
        </ul>
      </div>

      {/* Mapa */}
      <div className="flex-1 w-full h-96 md:h-auto">
        <MapContainer center={[-33.4489, -70.6693]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {flyToPosition && <FlyToStore position={flyToPosition} />}
          {filteredStores.map((store) => (
            <Marker
              key={store._id}
              position={store.position}
              eventHandlers={{ click: () => setFlyToPosition(store.position) }}
            >
              <Popup>
                <strong>{store.name}</strong>
                <br />
                {store.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
