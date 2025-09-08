// backend/seedStores.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Store from "./models/Store.js";

dotenv.config();

const stores = [
  {
    name: "Casa Matriz",
    region: "Región Metropolitana",
    comuna: "La Florida",
    position: [-33.4627104, -70.7378504],
    address: "Laguna Sur Huingan Norte 9710, bodega D21",
  },
  {
    name: "Pet Perro Loco",
    region: "Región Metropolitana",
    comuna: "Colina",
    position: [-33.3000, -70.7000],
    address: "Colina",
  },
  {
    name: "Dogfood",
    region: "Región Metropolitana",
    comuna: "La Florida",
    position: [-33.5500, -70.6000],
    address: "La Florida",
  },
  {
    name: "Trewa",
    region: "VI Región",
    comuna: "Valparaíso",
    position: [-33.0458, -71.6197],
    address: "VI Región, Valparaíso",
  },
  {
    name: "Natural Dog",
    region: "VI Región",
    comuna: "Viña del Mar",
    position: [-33.0224, -71.5512],
    address: "VI Región, Viña del Mar",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Store.deleteMany(); // Limpia la colección si ya tiene datos
    await Store.insertMany(stores);
    console.log("✅ Puntos de venta insertados correctamente");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error al insertar puntos de venta:", error);
    mongoose.disconnect();
  }
};

seed();
