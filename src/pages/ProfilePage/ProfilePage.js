// src/components/ProfilePage/ProfilePage.js
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { uploadProfilePicture, getImageUrl } from "../../services/userService";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user's posts
  useEffect(() => {
    if (user) setPosts(user.posts || []);
  }, [user]);

  // Preview selected file
  useEffect(() => {
    if (!newProfilePic) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(newProfilePic);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [newProfilePic]);

  const handleFileChange = (e) => setNewProfilePic(e.target.files[0]);

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    if (!newProfilePic) return;

    try {
      setLoading(true);
      setError("");

      const updatedUser = await uploadProfilePicture(newProfilePic);
      setUser(updatedUser); // update context with new picture
      setNewProfilePic(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload picture. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>

      <div className="profile-picture">
        <img
          src={preview || getImageUrl(user.pictureUrl)}
          alt="Profile"
          width={120}
          height={120}
        />
        <form onSubmit={handleProfilePictureUpload}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" disabled={loading || !newProfilePic}>
            {loading ? "Uploading..." : "Change Picture"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="profile-posts">
        <h2>Your Posts</h2>
        <div className="posts-grid">
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post, index) => (
              <img
                key={index}
                src={post.imageUrl}
                alt={`Post ${index + 1}`}
                className="post-image"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
