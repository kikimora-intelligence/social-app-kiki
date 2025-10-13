// src/components/Header/Header.js
import { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ThemeContext from "../../../context/ThemeContext";
import { getImageUrl } from "../../../services/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { path: "/", label: "Home", end: true },
    { path: "/gallery", label: "Gallery" },
    { path: "/potions", label: "Potions" },
    { path: "/spells", label: "Spells" },
    { path: "/tarot", label: "Tarot" },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Theme toggle */}
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.themeButton} ${styles[theme]}`}
            onClick={toggleTheme}
            aria-label="Theme"
          >
            <span style={{ marginLeft: "8px" }}>☾</span>
            <span style={{ marginRight: "8px" }}>☀</span>
          </button>
        </div>

        {/* Nav links */}
        <div className={styles.navLinks}>
          {links.map(({ path, label, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Account/Profile */}
        <div className={styles.accountContainer} ref={dropdownRef}>
          {user ? (
            <div className={styles.userContainer}>
              <img
                src={getImageUrl(user.pictureUrl)}
                alt="Profile"
                title="Your profile"
                className={styles.profilePic}
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              <span>{user.username}</span>
              {showDropdown && (
                <div className={styles.dropdown}>
                  <NavLink to="/profile" onClick={() => setShowDropdown(false)}>
                    Account
                  </NavLink>
                  <NavLink
                    to="/settings"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to="/notifications"
                    onClick={() => setShowDropdown(false)}
                  >
                    Notifications
                  </NavLink>
                  <hr />
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className={styles.accountButton}
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-label="Account"
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </button>

              {showDropdown && (
                <div className={styles.dropdown}>
                  <NavLink to="/login" onClick={() => setShowDropdown(false)}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setShowDropdown(false)}
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
