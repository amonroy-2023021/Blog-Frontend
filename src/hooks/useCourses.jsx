import { useState, useEffect } from "react";
import axios from "axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/v1/courses/");
        setCourses(response.data);
      } catch (err) {
        console.error("Error al obtener los cursos:", err);
        setError(err.response ? err.response.data.message : err.message || "Error al obtener los cursos");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;