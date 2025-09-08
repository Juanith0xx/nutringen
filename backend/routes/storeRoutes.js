import express from "express";
import Store from "../models/Store.js";

const router = express.Router();

// Obtener todas las sucursales
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las sucursales", error });
  }
});

export default router;