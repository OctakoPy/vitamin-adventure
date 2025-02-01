import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminC: true }));
  }, [setCompletedGames]);

  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1>Congratulations! You boosted your immunity and defeated the virus!</h1>
        <p>
          By eating Vitamin C-rich foods, you've strengthened your immune system and won the battle!
        </p>
        <p>Here are the key foods you collected:</p>
        <div className="food-list">
          <ul>
            <li><strong>Kiwi:</strong> Packed with Vitamin C, helps support your immune system.</li>
            <li><strong>Lemon:</strong> A great source of Vitamin C, aids in fighting infections.</li>
            <li><strong>Orange:</strong> Boosts immunity and keeps you healthy with its high Vitamin C content.</li>
            <li><strong>Pineapple:</strong> Rich in Vitamin C, helps your body fight off viruses and promotes healing.</li>
          </ul>
        </div>
        <p>
          Keep including these Vitamin C-rich foods to stay healthy and fight off infections!
        </p>
        <div className="button-container">
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
          <button
            className="start-button"
            onClick={() => {
              setCompletedGames(prev => ({ ...prev, vitaminC: true }));
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
