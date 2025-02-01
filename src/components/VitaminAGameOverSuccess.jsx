const GameOverSuccess = ({ restartGame, navigateHome, setCompletedGames }) => {
  return (
    <div className="game-over">
      <h1>Congratulations! You've cleared your vision!</h1>
      <button className="restart-button" onClick={restartGame}>
        Play Again
      </button>
      <button
        className="home-button"
        onClick={() => {
          setCompletedGames(prev => ({ ...prev, vitaminA: true }));
          navigateHome();
        }}
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default GameOverSuccess;
