import { useState } from "react";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import Select from "react-select";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    region: "",
    tipo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const regiones = [
    { value: "Arica y Parinacota", label: "Arica y Parinacota" },
    { value: "Tarapacá", label: "Tarapacá" },
    { value: "Antofagasta", label: "Antofagasta" },
    { value: "Atacama", label: "Atacama" },
    { value: "Coquimbo", label: "Coquimbo" },
    { value: "Valparaíso", label: "Valparaíso" },
    { value: "Región Metropolitana", label: "Región Metropolitana" },
    { value: "O'Higgins", label: "O'Higgins" },
    { value: "Maule", label: "Maule" },
    { value: "Ñuble", label: "Ñuble" },
    { value: "Biobío", label: "Biobío" },
    { value: "La Araucanía", label: "La Araucanía" },
    { value: "Los Ríos", label: "Los Ríos" },
    { value: "Los Lagos", label: "Los Lagos" },
    { value: "Aysén", label: "Aysén" },
    { value: "Magallanes y Antártica Chilena", label: "Magallanes y Antártica Chilena" },
  ];

  const tipos = [
    { value: "venta", label: "Consulta de Venta" },
    { value: "distribucion", label: "Distribución" },
    { value: "otro", label: "Otro" },
  ];

  // ✅ Estilos personalizados para react-select
  const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    fontSize: "0.875rem", // text-sm
    padding: "0.125rem 0.25rem", // p-2
    borderColor: state.isFocused ? "#16a34a" : "#d1d5db", // verde o gris
    boxShadow: state.isFocused ? "0 0 0 2px rgba(22, 163, 74, 0.5)" : "none", // ring verde
    outline: "none",
    borderRadius: "0.375rem", // rounded-md
    transition: "all 0.2s ease",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#16a34a", // verde al pasar el mouse
    },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isFocused
      ? "rgba(22, 163, 74, 0.1)" // fondo verde suave al hover
      : "white",
    color: "#111827", // text-gray-900
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6b7280", // text-gray-500
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827", // text-gray-900
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-[100px] pt-[100px] px-4 py-10 md:py-16 lg:py-20 bg-white text-gray-800"
    >
      <div className="max-w-7xl mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Información de contacto */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mt-4 text-green-700">Contacto Nutringen</h2>
          <p className="text-lg font-medium">Te podemos ayudar</p>
          <p className="text-gray-600">
            Para consultas sobre venta y/o distribución puedes contactarnos a través de nuestro correo o directamente con nuestro equipo.
          </p>
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-2">
              <HiOutlineMail className="text-green-600 text-xl" />
              <a
                href="mailto:ventas@nutringen.cl"
                className="text-green-600 hover:underline"
              >
                ventas@nutringen.cl
              </a>
            </p>
            <p className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-green-600 text-xl" />
              Laguna Sur Huingan Norte 9710, Bodega D21, Pudahuel.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-16">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border border-gray-300 text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full border border-gray-300 text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Select de Región con estilos de enfoque */}
          <Select
            options={regiones}
            placeholder="Selecciona tu Región"
            value={regiones.find((r) => r.value === formData.region) || null}
            onChange={(option) =>
              setFormData({ ...formData, region: option.value })
            }
            styles={customSelectStyles}
          />

          {/* Select de Tipo de Solicitud con estilos de enfoque */}
          <Select
            options={tipos}
            placeholder="Tipo de Solicitud"
            value={tipos.find((t) => t.value === formData.tipo) || null}
            onChange={(option) =>
              setFormData({ ...formData, tipo: option.value })
            }
            styles={customSelectStyles}
          />

          <textarea
            name="mensaje"
            placeholder="Escribe tu Mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full border border-gray-300 text-sm p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-all"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
