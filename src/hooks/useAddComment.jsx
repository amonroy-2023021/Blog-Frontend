import { useState } from "react";
import axios from "axios";

const useAddComment = (postId, onCommentAdded) => {
  const [commentContent, setCommentContent] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !username.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Enviando comentario con postId:", postId);

    setIsSubmitting(true);
    try {
      const response = await axios.post(`http://localhost:3000/blog/v1/comments/addComment`, {
        post: postId,
        content: commentContent,
        username,
      });

      const newComment = response.data;
      console.log("Comentario agregado:", newComment);

      if (onCommentAdded) {
        onCommentAdded(newComment);
      }

      setCommentContent("");
      setUsername("");
      alert("Comentario agregado exitosamente.");
    } catch (err) {
      console.error("Error al agregar el comentario:", err);
      alert("Hubo un error al agregar el comentario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    commentContent,
    setCommentContent,
    username,
    setUsername,
    isSubmitting,
    handleCommentSubmit,
  };
};

export default useAddComment;