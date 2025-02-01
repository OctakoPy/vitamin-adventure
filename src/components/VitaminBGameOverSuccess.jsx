import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminB12: true }));
  }, [setCompletedGames]);

  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Congratulations! You won the race!</h1>
        <p>
          By eating Vitamin B12-rich foods, you've gained the energy to finish first!
        </p>
        <p>Here are the key foods you collected:</p>
        <div className="food-list">
          <ul>
            <li><strong>Eggs:</strong> Packed with Vitamin B12, great for energy and stamina.</li>
            <li><strong>Fish:</strong> Rich in B12, supporting brain health and muscle strength.</li>
            <li><strong>Milk:</strong> Provides B12 for healthy nerves and red blood cells.</li>
          </ul>
        </div>
        <p>
          Keep including these foods in your diet for more energy and strength!
        </p>
        <div className="button-container">
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
          <button
            className="start-button"
            onClick={() => {
              setCompletedGames(prev => ({ ...prev, vitaminB12: true }));
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
