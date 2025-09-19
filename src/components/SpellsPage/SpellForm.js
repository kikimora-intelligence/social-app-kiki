// SpellForm.js
import React, { useState } from "react";

const SpellForm = ({ onSpellSubmit }) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields here (if needed)

    // Create a new spell object
    const newSpell = {
      title,
      instructions,
      ingredients,
      image,
    };

    // Call the onSpellSubmit prop to pass the new spell to the parent component
    onSpellSubmit(newSpell);

    // Clear the form fields after submission
    setTitle("");
    setInstructions("");
    setIngredients("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SpellForm">
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
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <label>Ingredients:</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
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
