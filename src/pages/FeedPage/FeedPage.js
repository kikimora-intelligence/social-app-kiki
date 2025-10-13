// src/pages/FeedPage/FeedPage.js
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Post from "../../components/feed/Post";
import NewPostForm from "../../components/feed/NewPostForm";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
  };

  return (
    <div>
      <h1>Community Feed</h1>
      <NewPostForm onPostAdded={handlePostAdded} />
      {posts.map((p) => (
        <Post key={p.id} post={p} onCommentAdded={handleCommentAdded} />
      ))}
    </div>
  );
};
export default FeedPage;
