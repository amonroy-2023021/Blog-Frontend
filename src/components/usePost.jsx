import React from "react";
import { Link } from "react-router-dom";
import usePosts from "../hooks/Post.jsx";

const PostList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p style={{ textAlign: "center" }}>Cargando publicaciones...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div>
      {/* Encabezado */}
      <header style={{ backgroundColor: "#007BFF", padding: "20px", color: "#fff", textAlign: "center" }}>
        <h1>TEC BLOGGER</h1>
        <p>Responsive Personal Blog Theme</p>
      </header>

      {/* Contenido principal */}
      <div style={{ display: "flex", maxWidth: "1200px", margin: "20px auto", gap: "20px" }}>
        {/* Área de publicaciones */}
        <main style={{ flex: 3 }}>
          {posts.map((post) => {
            return (
              <div
                key={post.uid} // Asegúrate de usar 'uid' en todas las claves
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  padding: "15px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2 style={{ color: "#007BFF" }}>{post.title}</h2>
                <p style={{ color: "#555" }}>{post.description.substring(0, 100)}...</p>
                <p>
                  <strong>Curso:</strong> {post.course?.CurseName || "Sin curso"}
                </p>
                <p>
                  <strong>Fecha:</strong> {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/posts/${post.uid}`} // Asegúrate de usar 'uid' también en el Link
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "10px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "5px",
                  }}
                >
                  Leer más
                </Link>
              </div>
            );
          })}
        </main>

        {/* Barra lateral */}
        <aside style={{ flex: 1, backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
          <h3 style={{ borderBottom: "2px solid #007BFF", paddingBottom: "10px", marginBottom: "15px" }}>
            Publicaciones recientes
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.slice(0, 5).map((post) => (
              <li key={post.uid} style={{ marginBottom: "10px" }}> {/* Cambié '_id' por 'uid' aquí también */}
                <Link to={`/posts/${post.uid}`} style={{ color: "#007BFF", textDecoration: "none" }}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default PostList;
