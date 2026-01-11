// SpellForm.js
import React, { useState } from "react";
import styles from "./SpellForm.module.css";

const SpellForm = ({ onSpellSubmit }) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields here (if needed)

    // Create a new spell object
    const newSpell = {
      title,
      instructions,

      image,
    };

    // Call the onSpellSubmit prop to pass the new spell to the parent component
    onSpellSubmit(newSpell);

    // Clear the form fields after submission
    setTitle("");
    setInstructions("");

    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className={styles.SpellForm}>
      <h2>Add a New Spell</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Instructions:</label>
        <input
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Add Spell</button>
      </form>
    </div>
  );
};

export default SpellForm;
