import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para crear post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(
        data.map((p) => ({
          ...p,
          rating: p.rating || 0, // rating inicial
        }))
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Completa todos los campos");

    setCreating(true);
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: title, contenido: content, rating: 0 }),
      });
      const newPost = await res.json();
      setPosts([{ ...newPost, rating: 0 }, ...posts]);
      setTitle("");
      setContent("");
      setSuccessMessage("¡Post creado con éxito!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleRating = (postId, value) => {
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, rating: value } : post
      )
    );
    // Aquí puedes enviar rating al backend si quieres persistirlo
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Cargando posts...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-green-700 text-center">
        Blog
      </h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 transition-all">
          {successMessage}
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleCreatePost}
        className="mb-10 bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Crear nuevo post
        </h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
        <button
          type="submit"
          disabled={creating}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:-translate-y-1"
        >
          {creating ? "Creando..." : "Crear Post"}
        </button>
      </form>

      {/* Lista de posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-6 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800">{post.titulo}</h2>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(post.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">{post.contenido}</p>

            {/* Estrellas de valoración */}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-transform ${
                    post.rating >= star ? "text-yellow-400" : "text-gray-300"
                  } hover:scale-110`}
                  onClick={() => handleRating(post._id, star)}
                />
              ))}
              <span className="ml-2 text-gray-600 font-medium">
                {post.rating} / 5
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
