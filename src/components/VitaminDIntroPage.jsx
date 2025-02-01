import React from 'react';
import '../styles/Intro.css';

const IntroPage = ({ startGame }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Welcome to Vitamin D: Sunlight Jump!</h1>
        <p>
          Your goal is to climb as high as possible while collecting enough Vitamin D before time runs out!
          Step on sunny platforms to absorb Vitamin D and gain energy. 
          Avoid cloudy platforms, as you will lose your Vitamin D!
        </p>
        <p>
          You must collect at least 10 Vitamin D points before the timer runs out. 
          Press the <strong>right</strong> and <strong>left</strong> arrow keys to move!
        </p>
        <h2>Why is Vitamin D Important?</h2>
        <p>
          Vitamin D keeps your bones strong, boosts your energy, and helps your immune system. 
          You get it from sunlight and foods like fish, eggs, and fortified milk. 
          Without enough Vitamin D, you can feel weak and tired—so jump to the sun and stay healthy!
        </p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
