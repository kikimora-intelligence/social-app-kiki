import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../../../context/ThemeContext";
import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // fix the online user count later when u focus on the backend solely
    fetch("/api/online")
      .then((r) => r.json())
      .then((d) => setCount(d.online))
      .catch(() => setCount(null));
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Connect" },
    { path: "/potions", label: "Forums" },
    { path: "/spells", label: "Lexicons" },
    { path: "/tarot", label: "Tarot" },
    { path: "/games", label: "Games" }, // Fixed: different path
  ];

  return (
    <>
      <header className={styles.Header0}>
        <div className={styles.Settings}>
          {count !== null ? `${count} online` : "Loading..."}
        </div>
        <div className={styles.Logo}>
          <img src="/images/Kagome_Doll.png" alt="hina doll Lilico logo" />
        </div>
        <div className={styles.Account}>
          <img src="/images/user.png" alt="user" />
        </div>
      </header>

      <header className={styles.Header}>
        <nav>
          {links.map((link) => (
            <NavLink key={link.label} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}