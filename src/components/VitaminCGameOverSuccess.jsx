import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminC: true }));
  }, [setCompletedGames]);

  return (
    <div className="game-over">
      <h1>Congratulations! You boosted your immunity system and defeated the virus!</h1>
      <button className="restart-button" onClick={restartGame}>
        Play Again
      </button>
      <button
        className="home-button"
        onClick={() => {
          setCompletedGames(prev => ({ ...prev, vitaminC: true }));
          navigateHome();
        }}
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default GameOverSuccess;
