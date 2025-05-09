import React from "react";
import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/PostDetail";

const PostDetail = () => {
  const { postId } = useParams(); // Obtenemos el ID desde la URL
  const { post, loading, error } = usePostDetail(postId); // Usamos el hook para obtener los detalles del post

  if (loading) return <p style={{ textAlign: "center" }}>Cargando detalles del post...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  if (!post) return <p style={{ textAlign: "center" }}>No se encontró el post.</p>;

  return (
    <div>
      {/* Encabezado */}
      <header style={{ backgroundColor: "#007BFF", padding: "20px", color: "#fff", textAlign: "center" }}>
        <h1>TEC BLOGGER</h1>
        <p>Responsive Personal Blog Theme</p>
      </header>

      {/* Contenido principal */}
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#333", textAlign: "center" }}>{post.title}</h1>
        <p style={{ color: "#555", lineHeight: "1.6" }}>{post.description}</p>
        <p>
          <strong>Curso:</strong> {post.course?.CurseName || "Sin curso"}
        </p>
        <p>
          <strong>Fecha:</strong> {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Sección de comentarios */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ borderBottom: "2px solid #007BFF", paddingBottom: "10px" }}>Comentarios</h3>
          {post.comments && post.comments.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {post.comments.map((comment) => (
                <li
                  key={comment._id} 
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <p style={{ margin: 0, color: "#555" }}>{comment.content}</p>
                  <small style={{ color: "#999" }}>Por: {comment.username || "Anónimo"}</small>
                  <small style={{ display: "block", color: "#999", marginTop: "5px" }}>
                    Fecha: {new Date(comment.updatedAt).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#555" }}>No hay comentarios aún.</p>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 15px",
              backgroundColor: "#007BFF",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Volver a publicaciones
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
