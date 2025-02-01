import React from 'react';
import '../styles/Intro.css';

const IntroPage = ({ startGame }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Welcome to Vitamin C: Battle Against the Virus!</h1>
        <p>
          Viruses are attacking! Your goal is to survive by boosting your immune system with Vitamin C-rich foods.
        </p>
        <p>
          Click on foods that are high in Vitamin C to power up and fight off the viruses. 
          But watch out—eating the wrong food will weaken your defenses!
        </p>
        <h2>Why is Vitamin C Important?</h2>
        <p>
          Vitamin C strengthens your immune system, helps heal wounds, and keeps you healthy. 
          It’s found in oranges, strawberries, bell peppers, and more. Without enough Vitamin C, 
          your body struggles to fight off infections—so collect the right foods and defeat the viruses!
        </p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
