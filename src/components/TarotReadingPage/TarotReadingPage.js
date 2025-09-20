import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

const TarotReadingPage = () => {
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const tarotDeck = [
    { id: 1, title: 'The Fool', image: 'https://i.pinimg.com/736x/ce/ae/a1/ceaea120f1a40a51c13c244b3d945097.jpg', interpretation: 'A new beginning and spontaneous actions.', description: 'The Fool represents new adventures, unexpected opportunities, and taking risks. Embrace the unknown with an open heart.' },
    { id: 2, title: 'The Magician', image: 'https://i.pinimg.com/736x/e1/39/5d/e1395d6cbd60be9676c839953b7f7d2b.jpg', interpretation: 'Manifestation and power.', description: 'The Magician symbolizes personal power, resourcefulness, and the ability to manifest your desires. Focus on your goals and use your talents wisely.' },
    { id: 3, title: 'The High Priestess', image: 'https://example.com/images/high-priestess.jpg', interpretation: 'Intuition and mystery.', description: 'The High Priestess represents intuition, mysteries, and the unconscious mind. Trust your instincts and explore the depths of your inner wisdom.' },
    { id: 4, title: 'The Empress', image: 'https://example.com/images/empress.jpg', interpretation: 'Nurturing and abundance.', description: 'The Empress symbolizes nurturing energy, fertility, and abundance. Connect with nature and cultivate a loving, supportive environment.' },
    { id: 5, title: 'The Emperor', image: 'https://example.com/images/emperor.jpg', interpretation: 'Authority and structure.', description: 'The Emperor represents authority, leadership, and structured control. Set clear boundaries and take a disciplined approach to achieve your goals.' },
    // Add more cards with descriptions as needed
  ];

  const questions = [
    'Will I find love?',
    'Will I fulfill my purpose?',
    'Am I on the right path?',
    // Add more questions as needed
  ];

  const handleQuestionSubmit = () => {
    // Select a random tarot card
    const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
    setSelectedCard(randomCard);
  };

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Select a Question:</label>
        <select value={selectedQuestion} onChange={handleQuestionChange}>
          <option value="" disabled>Select a question...</option>
          {questions.map((question, index) => (
            <option key={index} value={question}>{question}</option>
          ))}
        </select>
      </div>

      {/* Render QuestionForm and pass the handleQuestionSubmit callback */}
      <QuestionForm onQuestionSubmit={handleQuestionSubmit} />

      {/* Display the selected card */}
      {selectedCard && (
        <div>
          <h2>{selectedQuestion}</h2>
          <img src={process.env.PUBLIC_URL + selectedCard.image} alt={selectedCard.title} />
        </div>
      )}
    </div>
  );
};

export default TarotReadingPage;


