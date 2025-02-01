import { useEffect } from 'react';

const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames, vitaminDPoints }) => {
  useEffect(() => {
    setCompletedGames(prev => ({ ...prev, vitaminD: true }));
  }, [setCompletedGames]);

  return (
    <div className="game-over">
      <h1>Hooray! You got enough sunlight!</h1>
      <p className="score">You collected {vitaminDPoints} Vitamin D points!</p>
      <button className="restart-button" onClick={restartGame}>
        Play Again
      </button>
      <button
        className="home-button"
        onClick={() => {
          setCompletedGames(prev => ({ ...prev, vitaminD: true }));
          navigateHome();
        }}
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default GameOverSuccess;