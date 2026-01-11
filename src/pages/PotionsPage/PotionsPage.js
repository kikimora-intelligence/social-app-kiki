// PotionsPage.js
import React, { useState } from "react";
import "./PotionsPage.css";
import PotionDetailsModal from "./PotionDetailsModal";

const PotionsPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedPotion, setSelectedPotion] = useState(null);

  const potionsData = [
    {
      id: 1,
      name: "Potion of Invisibility",

      price: 10.0, // Changed to a numeric value for easier calculation
      image: "/images/potion1.jpg",
    },
    {
      id: 2,
      name: "Healing Elixir",

      price: 15.0,
      image: "/images/potion2.jpg",
    },
    // Add more potion data as needed
  ];

  const handleAddToCart = (potion) => {
    setCart([...cart, potion]);
  };

  return (
    <div className="PotionsPage">
      <h2 className="page-title">Magical Potions Shop</h2>
      <div className="potion-list">
        {potionsData.map((potion) => (
          <div key={potion.id} className="potion-item">
            <img
              src={process.env.PUBLIC_URL + potion.image}
              alt={potion.name}
              className="potion-image"
            />
            <h3 className="potion-name">{potion.name}</h3>

            <p className="potion-price">Price: ${potion.price.toFixed(2)}</p>
            <div className="button-container">
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(potion)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPotion && (
        <PotionDetailsModal
          potion={selectedPotion}
          onClose={() => setSelectedPotion(null)}
        />
      )}
    </div>
  );
};

export default PotionsPage;
