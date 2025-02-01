import React from 'react';
import '../styles/Intro.css';

const GameOverFail = ({ restartGame, navigateHome }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Oh no! You lost the race!</h1>
        <p>
          You didn’t get enough <strong>Vitamin B12</strong> to keep your energy up.  
          Without it, your body couldn’t generate enough <strong>stamina</strong> to win!
        </p>
        <p>
          Try again and collect more <strong>Vitamin B12-rich foods</strong> like eggs, fish, and meat to boost your speed!
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
