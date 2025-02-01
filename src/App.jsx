import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';

// Import the game components
import VitaminA from './components/VitaminA';
import VitaminC from './components/VitaminC';
import VitaminD from './components/VitaminD';
import VitaminB12 from './components/VitaminB12';

const App = () => {
  const [completedGames, setCompletedGames] = useState({
    vitaminA: false,
    vitaminC: false,
    vitaminD: false,
    vitaminB12: false,
  });

  return (
    <Router> 
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h1 className="title">Vitamin Adventure</h1>
              <div className="games-container">
  {['vitaminA', 'vitaminC', 'vitaminD', 'vitaminB12'].map((vitamin) => (
    <Link
      key={vitamin}
      to={`/${vitamin}`}
      className={`game-button ${completedGames[vitamin] ? 'completed' : ''}`}
    >
      <span>{vitamin.replace('vitamin', '')}</span>
      {completedGames[vitamin] && (
        <img src="/assets/star.png" alt="Completed" className="star-icon" />
      )}
    </Link>
  ))}
</div>


              <footer className="footer">Created by Octako Py <br></br>©2025</footer>
            </div>
          }
        />
        <Route path="/vitaminA" element={<VitaminA setCompletedGames={setCompletedGames} />} />
        <Route path="/vitaminC" element={<VitaminC setCompletedGames={setCompletedGames} />} />
        <Route path="/vitaminD" element={<VitaminD setCompletedGames={setCompletedGames} />} />
        <Route path="/vitaminB12" element={<VitaminB12 setCompletedGames={setCompletedGames} />} />
      </Routes>
    </Router>
  );
};

export default App;
