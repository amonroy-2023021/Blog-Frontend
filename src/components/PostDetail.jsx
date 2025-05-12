import React from "react";
import { useParams, Link } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import useAddComment from "../hooks/useAddComment";

const PostDetail = () => {
  const { postId } = useParams();
  const { post, loading, error } = usePostDetail(postId);
  const { commentContent, setCommentContent, username, setUsername, isSubmitting, handleCommentSubmit } =
    useAddComment(postId);

  if (loading) return <p style={{ textAlign: "center", color: "#555" }}>Cargando detalles del post...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  if (!post) return <p style={{ textAlign: "center", color: "#555" }}>No se encontró el post.</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Encabezado */}
      <header
        style={{
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>BLOG DEL PROGRAMADOR</h1>
        <p style={{ margin: 0, fontSize: "1.2rem" }}>Algunos articulos sobre un estudiante de programacion</p>
      </header>

      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#6a11cb", textAlign: "center", marginBottom: "20px" }}>{post.title}</h1>
        <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "20px" }}>{post.description}</p>
        <p style={{ fontSize: "14px", marginBottom: "10px", color: "#6a11cb" }}>
          <strong>Curso:</strong> {post.course?.CurseName || "Sin curso"}
        </p>
        <p style={{ fontSize: "14px", marginBottom: "20px", color: "#6a11cb" }}>
          <strong>Fecha:</strong> {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div id="comentarios" style={{ marginTop: "30px" }}>
          <h3 style={{ borderBottom: "2px solid #6a11cb", paddingBottom: "10px", color: "#6a11cb" }}>Comentarios</h3>
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
                    Fecha: {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#555" }}>No hay comentarios aún.</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              marginBottom: "10px",
            }}
            disabled={isSubmitting}
          />
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              marginBottom: "10px",
            }}
            rows="4"
            disabled={isSubmitting}
          ></textarea>
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#6a11cb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2575fc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a11cb")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Agregar comentario"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "10px 15px",
              backgroundColor: "#6a11cb",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2575fc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a11cb")}
          >
            Volver a publicaciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;