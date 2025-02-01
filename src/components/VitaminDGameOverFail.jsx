import React from 'react';
import '../styles/Intro.css';

const GameOverFail = ({ restartGame, navigateHome }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Oh no! You didn't get enough sunlight!</h1>
        <p>
          You didn't collect enough <strong>Vitamin D</strong> to keep your energy high and your bones strong. 
          Vitamin D is vital for your body’s energy levels and bone health, so make sure to step on sunny platforms to gather it!
        </p>
        <p>
          Try again and aim to collect at least 10 Vitamin D points before time runs out.
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
