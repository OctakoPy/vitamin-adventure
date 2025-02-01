import React from 'react';
import '../styles/Intro.css';

const GameOverFail = ({ restartGame, navigateHome }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Oh no! The viruses are still alive!</h1>
        <p>
          You didn’t collect enough <strong>Vitamin C</strong> to boost your immune system.
          Vitamin C is key to fighting off viruses, so make sure to grab more Vitamin C-rich foods like oranges and strawberries!
        </p>
        <p>
          Try again and make sure to click on those <strong>Vitamin C-packed foods</strong> to defeat the virus army!
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
