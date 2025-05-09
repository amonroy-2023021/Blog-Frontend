import { useState, useEffect } from "react";
import axios from "axios";

const usePostDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) {
        setError("El ID del post no está definido o es inválido.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/blog/v1/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener los detalles del post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  return { post, loading, error };
};

export default usePostDetail;