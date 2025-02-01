import React from 'react';
import '../styles/Intro.css';

const GameOverFail = ({ restartGame, navigateHome }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Oh no! Your vision is still blurry!</h1>
        <p>
          You didn’t get enough <strong>Vitamin A</strong> to improve your eyesight.  
          Try again and collect more <strong>Vitamin A-rich foods</strong> to see clearly!
        </p>
        <div className="button-container">
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
          <button className="start-button" onClick={navigateHome}>
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverFail;
