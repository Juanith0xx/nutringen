// backend/routes/posts.js
import express from "express";
import Post from "../models/Post.js"; // Asegúrate de tener este modelo

const router = express.Router();

// GET: obtener todos los posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ fecha: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

// POST: crear un nuevo post
router.post("/", async (req, res) => {
  try {
    const nuevoPost = new Post(req.body);
    await nuevoPost.save();
    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el post", error });
  }
});

export default router;
