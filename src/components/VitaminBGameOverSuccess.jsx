import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminB12: true }));
  }, [setCompletedGames]);

  return (
    <div className="game-over">
      <h1>Congratulations! You won the race!</h1>
      <button className="restart-button" onClick={restartGame}>
        Play Again
      </button>
      <button
        className="home-button"
        onClick={() => {
          setCompletedGames(prev => ({ ...prev, vitaminB12: true }));
          navigateHome();
        }}
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default GameOverSuccess;
