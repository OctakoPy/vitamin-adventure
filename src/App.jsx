import { useState } from 'react';
import './App.css';

const App = () => {
  const [completedGames, setCompletedGames] = useState({
    vitaminA: false,
    vitaminC: false,
    vitaminD: false,
    vitaminB12: false,
  });

  const handleGameStart = (vitamin) => {
    // Here you can redirect or trigger game start
    console.log(`Starting ${vitamin} game...`);
  };

  return (
    <div className="app">
      <h1 className="title">Vitamin Adventure</h1>
      <div className="games-container">
        {['vitaminA', 'vitaminC', 'vitaminD', 'vitaminB12'].map((vitamin) => (
          <div
            key={vitamin}
            className={`game-button ${completedGames[vitamin] ? 'completed' : ''}`}
            onClick={() => handleGameStart(vitamin)}
          >
            <span>{vitamin.replace('vitamin', '')}</span>
            {completedGames[vitamin] && <span className="star">⭐</span>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">Created by Me 2025!</footer>
    </div>
  );
};

export default App;
