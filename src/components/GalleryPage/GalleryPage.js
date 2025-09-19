// GalleryPage.js
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/image5.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleArrowClick = (direction) => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    const isValidIndex = newIndex >= 0 && newIndex < images.length;

    if (isValidIndex) {
      handleImageClick(newIndex);
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    if (newComment.trim() !== "") {
      const imageKey = images[currentIndex];
      const imageComments = comments[imageKey] || [];
      setComments({
        ...comments,
        [imageKey]: [...imageComments, newComment],
      });
      setNewComment("");
    }
  };

  const getImageComments = () => {
    const imageKey = images[currentIndex];
    const commentsForImage = comments[imageKey] || [];

    return commentsForImage.map((comment, index) => (
      <li key={index}>
        {user && (
          <span>
            <strong>{user.username}: </strong>
          </span>
        )}
        {comment}
      </li>
    ));
  };

  return (
    <div className="GalleryPage">
      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            onClick={() => handleImageClick(index)}
            src={process.env.PUBLIC_URL + image}
            alt={`Artwork ${index + 1}`}
            className={currentIndex === index ? "active" : ""}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal">
          <button className="close-button" onClick={handleCloseModal}>
            Close
          </button>
          <div className="arrows">
            {currentIndex > 0 && (
              <div
                className="arrow left-arrow"
                onClick={() => handleArrowClick("prev")}
              >
                &lt; Back
              </div>
            )}
            {currentIndex < images.length - 1 && (
              <div
                className="arrow right-arrow"
                onClick={() => handleArrowClick("next")}
              >
                Forward &gt;
              </div>
            )}
          </div>
          <div className="modal-content">
            <img
              src={selectedImage}
              alt={`Artwork ${currentIndex + 1}`}
              className="modal-image"
            />
            <div className="comments-section">
              <h3>Comments</h3>
              <ul>{getImageComments()}</ul>
              <form onSubmit={handleAddComment}>
                <label>
                  Add Comment:
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </label>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
