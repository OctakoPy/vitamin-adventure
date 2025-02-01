import React from 'react';
import '../styles/Intro.css';

const IntroPage = ({ startGame }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Welcome to Vitamin B12: Marathon Race!</h1>
        <p>
          Get ready to race! Your goal is to outrun your opponents by collecting foods rich in Vitamin B12, which will give you a speed boost!
        </p>
        <p>
          Use the <strong>up</strong> and <strong>down</strong> arrow keys to switch lanes and grab the right foods. 
          But be careful! Eating the wrong food will slow you down!
        </p>
        <h2>Why is Vitamin B12 Important?</h2>
        <p>
          Vitamin B12 helps your body produce energy and keeps your nervous system healthy. 
          It’s found in foods like meat, fish, eggs, and dairy. Without enough Vitamin B12, you might feel weak and tired—so grab the right foods and race to victory!
        </p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
