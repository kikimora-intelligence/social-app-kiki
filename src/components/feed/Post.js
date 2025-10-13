import { useState } from "react";
import axios from "../../api/axios";

export default function Post({ post, onCommentAdded }) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `/api/posts/${post._id}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onCommentAdded(post._id, response.data.comments.slice(-1)[0]);
      setComment("");
    } catch (err) {
      console.error("Failed to add comment:", err.response || err.message);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <strong>{post.author.username}</strong>
      <p>{post.content}</p>
      <div>
        <h4>Comments:</h4>
        {post.comments.map((c) => (
          <p key={c._id}>
            <strong>{c.author.username}:</strong> {c.text}
          </p>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}
