import { useState } from "react";
import axios from "../../api/axios";

export default function NewPostForm({ onPostAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "/api/posts",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onPostAdded(response.data);
      setContent("");
    } catch (err) {
      console.error("Failed to create post:", err.response || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
}
