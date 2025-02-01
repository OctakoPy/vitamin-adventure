import React from 'react';
import '../styles/Intro.css';

const IntroPage = ({ startGame }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Welcome to Vitamin A: Clear Vision Quest!</h1>
        <p>
          In this game, your goal is to collect healthy foods that are rich in Vitamin A to improve your vision!
        </p>
        <p>
          Click on the foods that contain Vitamin A to help clear your vision and make the screen less blurry. 
          Be careful! If you click on junk food, your vision will get worse!
        </p>
        <h2>What is Vitamin A?</h2>
        <p>
          Vitamin A is an essential nutrient that helps maintain healthy vision, skin, and immune system. 
          It is found in foods like carrots, sweet potatoes, and spinach. Without enough Vitamin A, your vision can become blurry, 
          and you may even experience night blindness.
        </p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default IntroPage;