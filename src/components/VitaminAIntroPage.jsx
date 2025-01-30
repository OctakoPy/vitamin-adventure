// /src/components/IntroPage.jsx
const IntroPage = ({ startGame }) => {
    return (
      <div className="intro-page">
        <h1>Welcome to Vitamin A: Clear Vision Quest!</h1>
        <p>Your goal is to collect healthy foods rich in Vitamin A to improve your vision!</p>
        <p>Avoid junk food, or your vision will get worse!</p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    );
  };
  
  export default IntroPage;
  