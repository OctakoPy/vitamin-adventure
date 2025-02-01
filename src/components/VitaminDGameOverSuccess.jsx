const GameOverSuccess = ({ restartGame, navigateHome, vitaminDPoints }) => {
  return (
    <div className="game-over">
      <h1>Hooray! You got enough sunlight!</h1>
      <p className="score">You collected {vitaminDPoints} Vitamin D points!</p>
      <button className="restart-button" onClick={restartGame}>
        Play Again
      </button>
      <button className="home-button" onClick={navigateHome}>
        Return to Homepage
      </button>
    </div>
  );
};

export default GameOverSuccess;