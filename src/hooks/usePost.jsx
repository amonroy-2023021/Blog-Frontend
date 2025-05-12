import { useState, useEffect } from "react";
import axios from "axios";

const usePosts = (filter = {}, sort = "desc") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams({ ...filter, sort }).toString();
        const response = await axios.get(`http://localhost:3000/blog/v1/posts?${queryParams}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error al obtener las publicaciones:", err);
        setError(err.response ? err.response.data.message : err.message || "Error al obtener las publicaciones");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filter, sort]);

  return { posts, loading, error };
};

export default usePosts;