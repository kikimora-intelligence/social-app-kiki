// SpellsPage.js
import React, { useState } from "react";
import SpellForm from "./SpellForm";
import SpellList from "./SpellList";
import "./SpellsPage.css";

const SpellsPage = () => {
  const [spells, setSpells] = useState([
    {
      title: "Love Spell",
      instructions: "A powerful spell to attract love into your life.",
      ingredients: "Red candle, rose petals, lavender oil",
      image: "/images/image1.png", // Replace with the path to your image
    },
  ]);

  const handleSpellSubmit = (newSpell) => {
    setSpells([...spells, newSpell]);
  };

  return (
    <div className="SpellsPage">
      <SpellForm onSpellSubmit={handleSpellSubmit} />
      <SpellList spells={spells} />
    </div>
  );
};

export default SpellsPage;
