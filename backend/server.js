// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import postRoutes from "./routes/posts.js";
import storeRoutes from "./routes/storeRoutes.js"; // 👈 Nueva ruta de stores

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error MongoDB:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Usar rutas
app.use("/api/posts", postRoutes);
app.use("/api/stores", storeRoutes); // 👈 Ahora puedes consultar sucursales

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Servidor corriendo en puerto ${PORT}`));
