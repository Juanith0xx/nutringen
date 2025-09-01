import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  contenido: String,
  imagen: String,
  fecha: { type: Date, default: Date.now },
  slug: { type: String, unique: true }
});

export default mongoose.model("Post", postSchema);
