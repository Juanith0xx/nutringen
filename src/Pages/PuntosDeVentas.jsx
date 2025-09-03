// src/pages/PuntoDeVenta.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stores = [
  { id: 1, name: "Casa Matriz", position: [-33.4627104, -70.7378504], address: "Laguna Sur Huingan Norte 9710, bodega D21" },
];

export default function PuntoDeVenta() {
  return (
    <div className="flex h-screen">
      {/* Sidebar con lista de sucursales */}
      <div className="w-1/3 bg-white shadow-lg p-4 pt-20 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Puntos de Venta</h2>
        <ul className="space-y-3">
          {stores.map((store) => (
            <li key={store.id} className="border-b pb-2">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.address}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Mapa */}
      <div className="flex-1">
        <MapContainer center={[-33.4489, -70.6693]} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stores.map((store) => (
            <Marker key={store.id} position={store.position}>
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
