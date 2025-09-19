import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GalleryPage from "./components/GalleryPage/GalleryPage";
import PotionsPage from "./components/PotionsPage/PotionsPage";
import SpellsPage from "./components/SpellsPage/SpellsPage";
import TarotReadingPage from "./components/TarotReadingPage/TarotReadingPage";

import Login from "./components/Login/Login";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./context/Theme.css";

import "./App.css";

const Home = () => (
  <div className="art-gallery-container">
    <main className="art-gallery-main">
      <h2>Home Page</h2>
    </main>

    <footer className="art-gallery-footer">{/* Footer content */}</footer>
  </div>
);

const App = () => {
  const handleLogin = (username) => {
    // Handle the login logic, e.g., update the user state
    console.log(`${username} logged in`);
  };

  return (
    <div>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
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
