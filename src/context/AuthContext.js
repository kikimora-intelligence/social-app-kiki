// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Step 1: Initialize user safely from localStorage if it exists
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Step 2: Fetch profile from API if no user loaded but token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
          const res = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const fetchedUser = {
            username: res.data.user.username,
            email: res.data.user.email,
            pictureUrl: res.data.user.pictureUrl,
            token,
          };

          setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));
        } catch (err) {
          console.error("Profile fetch failed", err);
          setUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Keep localStorage in sync whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
