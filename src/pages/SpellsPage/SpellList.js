// SpellList.js
import React from "react";

const SpellList = ({ spells }) => {
  return (
    <div className="SpellList">
      <h2>Spells</h2>
      <ul>
        {spells.map((spell, index) => (
          <li key={index}>
            <h3>{spell.title}</h3>
            <p>{spell.description}</p>
            <p>Instructions: {spell.instructions}</p>
            {spell.image && (
              <img
                src={process.env.PUBLIC_URL + spell.image}
                alt={spell.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpellList;
