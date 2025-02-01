const GameOverSuccess = ({ restartGame, navigateHome }) => {
    return (
      <div className="game-over">
        <h1>Congratulations! You won the race!</h1>
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
  