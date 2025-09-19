// PotionDetailsModal.js
import React, { useState } from 'react';
import './PotionDetailsModal.css'; // Create a CSS file for styling

const PotionDetailsModal = ({ potion, onClose, onAddComment, comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{potion.name} Details</h2>
        <img
          src={process.env.PUBLIC_URL + potion.image}
          alt={potion.name}
          className="potion-image"
        />
        <p>{potion.description}</p>
        <p>Price: {potion.price}</p>
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <div className="comment-input">
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PotionDetailsModal;
