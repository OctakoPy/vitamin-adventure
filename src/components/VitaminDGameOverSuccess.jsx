import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames, vitaminDPoints }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminD: true }));
  }, [setCompletedGames]);

  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Hooray! You got enough sunlight!</h1>
        <p className="score">You collected {vitaminDPoints} Vitamin D points!</p>
        <p>
          Vitamin D is essential for healthy bones and a strong immune system. Your body produces Vitamin D when you get sunlight, so make sure to spend some time outdoors each day!
        </p>
        <p>
          Here are some tips to keep your Vitamin D levels high:
        </p>
        <div className="food-list">
          <ul>
            <li><strong>Spend time in the sun:</strong> 10–30 minutes of sunlight each day helps your body produce Vitamin D.</li>
            <li><strong>Eat Vitamin D-rich foods:</strong> Include foods like fatty fish, fortified milk, and egg yolks.</li>
            <li><strong>Exercise outdoors:</strong> Get active in the sunlight to help both your bones and overall health!</li>
          </ul>
        </div>
        <p>
          Keep getting your Vitamin D to stay healthy and strong!
        </p>
        <div className="button-container">
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
          <button
            className="start-button"
            onClick={() => {
              setCompletedGames(prev => ({ ...prev, vitaminD: true }));
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
