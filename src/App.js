import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import FeedPage from "./pages/FeedPage/FeedPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import PotionsPage from "./pages/PotionsPage/PotionsPage";
import SpellsPage from "./pages/SpellsPage/SpellsPage";
import TarotReadingPage from "./pages/TarotReadingPage/TarotReadingPage";

import Login from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./context/Theme.css";

import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/potions" element={<PotionsPage />} />
                <Route path="/spells" element={<SpellsPage />} />
                <Route path="/tarot" element={<TarotReadingPage />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
