// PotionsPage.js
import React, { useState } from "react";
import "./PotionsPage.css";
import PotionDetailsModal from "./PotionDetailsModal";

const PotionsPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [comments, setComments] = useState([]);

  const potionsData = [
    {
      id: 1,
      name: "Potion of Invisibility",
      description: "Become invisible for a short duration.",
      price: 10.0, // Changed to a numeric value for easier calculation
      image: "/images/potion1.jpg",
    },
    {
      id: 2,
      name: "Healing Elixir",
      description: "Restore health and vitality.",
      price: 15.0,
      image: "/images/potion2.jpg",
    },
    // Add more potion data as needed
  ];

  const handlePotionDetails = (potion) => {
    setSelectedPotion(potion);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleAddToCart = (potion) => {
    setCart([...cart, potion]);
  };

  const handleCheckout = () => {
    const totalSum = cart.reduce((sum, item) => sum + item.price, 0);
    console.log("Total Sum:", totalSum);

    // Implement the checkout logic (e.g., sending order details to the server)
    // ...

    // Optionally, you can clear the cart or show a success message
    setCart([]);
  };

  // Calculate the total sum of items in the cart
  const totalSum = cart.reduce((sum, item) => sum + item.price, 0);

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
            <p className="potion-description">{potion.description}</p>
            <p className="potion-price">Price: ${potion.price.toFixed(2)}</p>
            <div className="button-container">
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(potion)}
              >
                Add to Cart
              </button>
              <button
                className="details-button"
                onClick={() => handlePotionDetails(potion)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="shopping-cart">
        <h3 className="cart-title">Shopping Cart</h3>
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="total-sum">Total: ${totalSum.toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      {selectedPotion && (
        <PotionDetailsModal
          potion={selectedPotion}
          onClose={() => setSelectedPotion(null)}
          onAddComment={handleAddComment}
          comments={comments}
        />
      )}
    </div>
  );
};

export default PotionsPage;
