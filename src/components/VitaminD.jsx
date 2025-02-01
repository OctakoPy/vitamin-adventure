import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VitaminD.css';
import IntroPage from './VitaminDIntroPage';
import GameOverSuccess from './VitaminDGameOverSuccess';
import GameOverFail from './VitaminDGameOverFail';

const VitaminD = ({ setCompletedGames }) => {
  const [vitaminDPoints, setVitaminDPoints] = useState(0);
  const [jumpsRemaining, setJumpsRemaining] = useState(50);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 300, y: 450 });
  const [platforms, setPlatforms] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const [viewportOffset, setViewportOffset] = useState(0);
  const navigate = useNavigate();

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 500;
  const PLATFORM_WIDTH = 80;
  const ROW_HEIGHT = 70;
  const COLUMN_POSITIONS = [150, 300, 500, 650];
  const TOTAL_ROWS = 100;

  const generatePlatforms = useCallback(() => {
    const newPlatforms = [];
    
    for (let i = 0; i < TOTAL_ROWS; i++) {
      const rowPlatforms = [];
      const positions = [...COLUMN_POSITIONS];
      const sunnyPositions = new Set();
      
      // Randomly select 2 positions to be sunny
      while (sunnyPositions.size < 2) {
        const randomIndex = Math.floor(Math.random() * positions.length);
        sunnyPositions.add(randomIndex);
      }

      // Create platforms for each position
      positions.forEach((x, index) => {
        rowPlatforms.push({
          x,
          y: GAME_HEIGHT - (i * ROW_HEIGHT),
          isSunny: sunnyPositions.has(index)
        });
      });

      newPlatforms.push(rowPlatforms);
    }
    return newPlatforms;
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const initialPlatforms = generatePlatforms();
      setPlatforms(initialPlatforms);
      const startY = GAME_HEIGHT - ROW_HEIGHT/2;
      setPlayerPosition({
        x: COLUMN_POSITIONS[1],
        y: startY
      });
      setVitaminDPoints(0);
      setJumpsRemaining(50);
      setTimeRemaining(30);
      setCurrentRow(0);
      setViewportOffset(0);
    }
  }, [gameStarted, generatePlatforms]);

  useEffect(() => {
    let timer;
    if (gameStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeRemaining]);

  useEffect(() => {
    if (gameStarted && (timeRemaining === 0 || jumpsRemaining === 0)) {
      if (vitaminDPoints >= 10) {
        setShowSuccess(true);
      } else {
        setShowFail(true);
      }
    }
  }, [timeRemaining, jumpsRemaining, vitaminDPoints, gameStarted]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || jumpsRemaining <= 0 || timeRemaining <= 0) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        const currentColumnIndex = COLUMN_POSITIONS.findIndex(x => 
          Math.abs(x - playerPosition.x) < PLATFORM_WIDTH
        );

        let nextColumnIndex;
        if (e.key === 'ArrowLeft') {
          nextColumnIndex = Math.max(0, currentColumnIndex - 1);
        } else {
          nextColumnIndex = Math.min(COLUMN_POSITIONS.length - 1, currentColumnIndex + 1);
        }

        const nextRow = currentRow + 1;
        if (nextRow < platforms.length) {
          const targetPlatform = platforms[nextRow].find(p => 
            p.x === COLUMN_POSITIONS[nextColumnIndex]
          );

          if (targetPlatform) {
            // Calculate new viewport offset
            const BOTTOM_MARGIN = 150;
            const targetY = targetPlatform.y;
            const newOffset = Math.max(0, GAME_HEIGHT - targetY - BOTTOM_MARGIN);
            
            setPlayerPosition({
              x: targetPlatform.x,
              y: targetY
            });
            
            setViewportOffset(newOffset);
            setVitaminDPoints(prev => 
              targetPlatform.isSunny ? prev + 1 : Math.max(0, prev - 1)
            );
            setJumpsRemaining(prev => prev - 1);
            setCurrentRow(nextRow);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, jumpsRemaining, timeRemaining, platforms, currentRow, playerPosition]);

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setIsRestarting(true);  // Step 1: Signal that we're starting to restart
  };
  
  // Add this useEffect to handle the actual restart
  useEffect(() => {
    if (isRestarting) {
      // Step 2: Actually restart the game
      setShowSuccess(false);
      setShowFail(false);
      setVitaminDPoints(0);
      setJumpsRemaining(50);
      setTimeRemaining(30);
      setCurrentRow(0);
      setViewportOffset(0);
      setPlayerPosition({ x: COLUMN_POSITIONS[1], y: GAME_HEIGHT - ROW_HEIGHT/2 });
      setPlatforms([]);
      setGameStarted(false);
      setIsRestarting(false);  // Reset the restart flag
    }
  }, [isRestarting]);

  return (
    <div className="vitamin-d-game">
    {showSuccess ? (
      <GameOverSuccess 
        restartGame={restartGame} 
        navigateHome={() => navigate('/')} 
        vitaminDPoints={vitaminDPoints}
        setCompletedGames={setCompletedGames}  // Add this line
      />
      ) : showFail ? (
        <GameOverFail restartGame={restartGame} navigateHome={() => navigate('/')} />
      ) : !gameStarted ? (
        <IntroPage startGame={startGame} />
      ) : (
        <div className="game-container">
          <div className="game-header">
            <h2 className="text-2xl font-bold mb-2">Vitamin D: Sunlight Jump</h2>
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">Vitamin D Points:</span>
                <span className="stat-value">{vitaminDPoints}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Jumps Left:</span>
                <span className="stat-value">{jumpsRemaining}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{timeRemaining}s</span>
              </div>
            </div>
          </div>

          <div className="game-area">
          <div className="sunlight-bar-container">  {/* New container div */}
    <img src="/assets/sun.png" alt="sun" className="sun-icon" />
    <div className="sunlight-bar">
      <div className="sunlight-segments">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="sunlight-segment"
            style={{
              backgroundColor: index < vitaminDPoints 
                ? `rgb(255, ${215 + (index * 4)}, 0)` 
                : 'rgba(255, 255, 255, 0.1)',
              opacity: index < vitaminDPoints ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  </div>
            <div className="game-world" style={{
              transform: `translateY(${viewportOffset}px)`,
              transition: 'transform 0.3s ease-out'
            }}>
              {platforms.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((platform, platformIndex) => (
                    <div
                      key={`${rowIndex}-${platformIndex}`}
                      className={`platform ${platform.isSunny ? 'sunny' : 'cloudy'}`}
                      style={{
                        position: 'absolute',
                        left: platform.x - PLATFORM_WIDTH/2,
                        top: platform.y,
                        width: PLATFORM_WIDTH,
                        height: '20px'
                      }}
                    />
                  ))}
                </div>
              ))}

              <div
                className="player"
                style={{
                  position: 'absolute',
                  left: playerPosition.x - 15,
                  top: playerPosition.y - 15,
                  width: '30px',
                  height: '30px'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitaminD;