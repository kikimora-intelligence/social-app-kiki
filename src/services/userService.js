import api from "../api/axios";

// Fetch the current logged-in user
export async function getCurrentUser() {
  const res = await api.get("/profile");
  return res.data.user;
}

// Upload profile picture
export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("picture", file);

  const res = await api.put("/profile/picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.user;
}

// Get full image URL (helper)
export function getImageUrl(path) {
  if (!path) return "/default-avatar.png";
  return `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${path}`;
}
