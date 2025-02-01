// /src/components/IntroPage.jsx
const IntroPage = ({ startGame }) => {
    return (
      <div className="intro-page">
        <h1>Welcome to Vitamin B12: Marathon Race!</h1>
        <p>Your goal is to collect healthy foods rich in Vitamin B12 to improve your speed!</p>
        <p>Avoid junk food, or you will slow down!</p>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    );
  };
  
  export default IntroPage;
  