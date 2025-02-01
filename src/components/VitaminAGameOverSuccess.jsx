import React from 'react';
import '../styles/Intro.css';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Congratulations! You've cleared your vision!</h1>
        <p>
          By collecting foods rich in <strong>Vitamin A</strong>, you've helped improve your eyesight and keep your vision sharp! Here are the key foods you collected:</p>
        <div className="food-list">
          <ul>
            <li><strong>Beef Liver:</strong> Rich in Vitamin A for clear vision.</li>
            <li><strong>Carrot:</strong> Full of beta-carotene, great for night vision.</li>
            <li><strong>Sweet Potato:</strong> High in Vitamin A to support eye health.</li>
            <li><strong>Spinach:</strong> Boosts vision and skin health with Vitamin A.</li>
            <li><strong>Broccoli:</strong> Packed with Vitamin A for overall health.</li>
          </ul>
        </div>
        <p>
          Keep eating these foods for strong vision and a healthy body!
        </p>
        <div className="button-container">
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
          <button
            className="start-button"
            onClick={() => {
              setCompletedGames(prev => ({ ...prev, vitaminA: true }));
              navigateHome();
            }}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverSuccess;
