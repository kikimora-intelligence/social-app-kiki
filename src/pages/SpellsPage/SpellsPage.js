// SpellsPage.js
import React, { useState } from "react";
import SpellForm from "./SpellForm";
import SpellList from "./SpellList";
import styles from "./SpellsPage.module.css";

const SpellsPage = () => {
  const [spells, setSpells] = useState([
    {
      title: "Love Spell",
      instructions: "A powerful spell to attract love into your life.",

      image: "/images/image1.png", // Replace with the path to your image
    },
  ]);

  const handleSpellSubmit = (newSpell) => {
    setSpells([...spells, newSpell]);
  };

  return (
    <div className={styles.SpellsPage}>
      <SpellForm onSpellSubmit={handleSpellSubmit} />
      <SpellList spells={spells} />
    </div>
  );
};

export default SpellsPage;
