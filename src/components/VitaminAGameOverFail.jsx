const GameOverFail = ({ restartGame, navigateHome }) => {
    return (
      <div className="game-over">
        <h1>Ooops! You did not get enough Vitamin A to clear your vision!!</h1>
        <button className="restart-button" onClick={restartGame}>
          Play Again
        </button>
        <button className="home-button" onClick={navigateHome}>
          Return to Homepage
        </button>
      </div>
    );
  };
  
  export default GameOverFail;
  