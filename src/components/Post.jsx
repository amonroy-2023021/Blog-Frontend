import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import usePosts from "../hooks/usePost.jsx";
import useCourses from "../hooks/useCourses.jsx";

const PostList = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const filter = useMemo(() => {
    return selectedCourse ? { course: selectedCourse } : {};
  }, [selectedCourse]);

  const { posts, loading: postsLoading, error: postsError } = usePosts(filter, sortOrder);
  const { courses, loading: coursesLoading, error: coursesError } = useCourses();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (postsLoading || coursesLoading) return <p style={{ textAlign: "center", color: "#555" }}>Cargando...</p>;
  if (postsError || coursesError) return <p style={{ textAlign: "center", color: "red" }}>Error: {postsError || coursesError}</p>;

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
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>BLOG DE</h1>
        <p style={{ margin: 0, fontSize: "1.2rem" }}>Explora publicaciones sobre programación</p>
      </header>

      {/* Filtros */}
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label htmlFor="courseFilter" style={{ marginRight: "10px", fontWeight: "bold", color: "#6a11cb" }}>
          Filtrar por curso:
        </label>
        <select
          id="courseFilter"
          value={selectedCourse}
          onChange={handleCourseChange}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          <option value="">Todos los cursos</option>
          {courses.map((course) => (
            <option key={course.uid} value={course.CurseName}>
              {course.CurseName}
            </option>
          ))}
        </select>

        <label htmlFor="sortOrder" style={{ marginRight: "10px", fontWeight: "bold", color: "#6a11cb" }}>
          Ordenar por fecha:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          <option value="desc">Más reciente primero</option>
          <option value="asc">Más antiguo primero</option>
        </select>
      </div>

      {/* Contenido principal */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
        {posts.map((post) => (
          <div
            key={post.uid}
            style={{
              width: "100%",
              maxWidth: "600px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* Contenido de la tarjeta */}
            <div>
              <h2 style={{ color: "#6a11cb", fontSize: "24px", margin: "0 0 10px" }}>{post.title}</h2>
              <p style={{ color: "#555", fontSize: "16px", margin: "0 0 10px" }}>{post.description.substring(0, 150)}...</p>
              <p style={{ fontSize: "14px", margin: "0 0 5px", color: "#6a11cb" }}>
                <strong>Curso:</strong> {post.course?.CurseName || "Sin curso"}
              </p>
              <p style={{ fontSize: "14px", margin: "0 0 10px", color: "#6a11cb" }}>
                <strong>Fecha:</strong> {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Link
              to={`/posts/${post.uid}`}
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px",
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
              Leer más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;