import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroPage from './VitaminCIntroPage';
import GameOverSuccess from './VitaminCGameOverSuccess';
import GameOverFail from './VitaminCGameOverFail';

const VitaminC = ({ setCompletedGames }) => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 });
  const [viruses, setViruses] = useState([]);
  const [foodRing, setFoodRing] = useState([]);
  const [ring, setRing] = useState(null);
  const [isDizzy, setIsDizzy] = useState(false);
  const [score, setScore] = useState(0);
  const [gameInitialized, setGameInitialized] = useState(false);
  const gameAreaRef = useRef(null);

  const goodFoods = [
    { image: '/assets/kiwi.png', name: 'Kiwi' },
    { image: '/assets/lemon.png', name: 'Lemon' },
    { image: '/assets/orange.png', name: 'Orange' },
    { image: '/assets/pineapple.png', name: 'Pineapple' }
  ];

  const badFoods = Array.from({ length: 20 }, (_, i) => ({
    image: `/assets/junk${i + 1}.png`,
    name: `Junk Food ${i + 1}`
  }));

  const createFoodRing = () => {
    const foods = [];
    const goodFoodCount = 1;
    const totalFoods = 5;
    
    // Create array of angles and shuffle them
    const angles = Array.from({ length: totalFoods }, (_, i) => 
      (i * 2 * Math.PI) / totalFoods
    );
    const shuffledAngles = angles.sort(() => Math.random() - 0.5);
    
    // Add good food at random angle
    foods.push({
      ...goodFoods[Math.floor(Math.random() * goodFoods.length)],
      isGood: true,
      angle: shuffledAngles[0]
    });
    
    // Add bad foods at remaining angles
    for (let i = 1; i < totalFoods; i++) {
      foods.push({
        ...badFoods[Math.floor(Math.random() * badFoods.length)],
        isGood: false,
        angle: shuffledAngles[i]
      });
    }
    
    return foods;
  };
  
  const createVirus = (index) => {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(side) {
      case 0: // top
        x = Math.random() * 800;
        y = -50;
        break;
      case 1: // right
        x = 850;
        y = Math.random() * 600;
        break;
      case 2: // bottom
        x = Math.random() * 800;
        y = 650;
        break;
      default: // left
        x = -50;
        y = Math.random() * 600;
        break;
    }
  
    return {
      id: Math.random(),
      x,
      y,
      speed: 0.25 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 4) + 1,
      delay: index * 5000 // Changed from 1000 to 2000 for longer delay between spawns
    };
  };

  useEffect(() => {
    if (gameStarted && !gameInitialized) {
      const initialViruses = Array.from({ length: 20 }, (_, index) => createVirus(index));
      setViruses(initialViruses);
      setFoodRing(createFoodRing());
      setGameInitialized(true);
    }
  }, [gameStarted, gameInitialized]);

  useEffect(() => {
    if (!gameStarted || showSuccess || showFail || !gameInitialized) return;

    const gameLoop = setInterval(() => {
      const currentTime = Date.now();
      
      setViruses(prevViruses => {
        const updatedViruses = prevViruses
          .filter(virus => currentTime >= virus.delay)
          .map(virus => {
            const dx = playerPosition.x - virus.x;
            const dy = playerPosition.y - virus.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const vx = (dx / distance) * virus.speed;
            const vy = (dy / distance) * virus.speed;

            return {
              ...virus,
              x: virus.x + vx,
              y: virus.y + vy
            };
          });

        const collision = updatedViruses.some(virus => {
          const dx = playerPosition.x - virus.x;
          const dy = playerPosition.y - virus.y;
          return Math.sqrt(dx * dx + dy * dy) < 30;
        });

        if (collision && !isDizzy) {
          setShowFail(true);
        }

        if (ring) {
          const remainingViruses = updatedViruses.filter(virus => {
            const dx = virus.x - playerPosition.x;
            const dy = virus.y - playerPosition.y;
            const distanceToVirus = Math.sqrt(dx * dx + dy * dy);
            
            if (Math.abs(distanceToVirus - ring.radius) < 10) {
              setRing(null);
              return false;
            }
            return true;
          });

          if (remainingViruses.length === 0 && prevViruses.length > 0) {
            setShowSuccess(true);
          }

          return remainingViruses;
        }

        return updatedViruses;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, playerPosition, ring, isDizzy, showSuccess, showFail, gameInitialized]);
    // Ring animation effect
    useEffect(() => {
      if (ring) {
        const animationInterval = setInterval(() => {
          setRing(prevRing => {
            if (!prevRing || prevRing.radius >= prevRing.maxRadius) {
              clearInterval(animationInterval);
              return null;
            }
            return { ...prevRing, radius: prevRing.radius + 5 };
          });
        }, 16);
  
        return () => clearInterval(animationInterval);
      }
    }, [ring]);
  
    const handleFoodClick = (food, e) => {
      e.stopPropagation();
      if (isDizzy) return;
  
      if (food.isGood) {
        setRing({ radius: 0, maxRadius: 400 });
        setScore(prev => prev + 1);
      } else {
        setIsDizzy(true);
        setTimeout(() => setIsDizzy(false), 2000);
      }
  
      setFoodRing(createFoodRing());
    };
  
    const startGame = () => {
      setGameStarted(true);
      setScore(0);
      setGameInitialized(false);
    };
  
    const restartGame = () => {
      setGameStarted(false);
      setShowSuccess(false);
      setShowFail(false);
      setViruses([]);
      setFoodRing([]);
      setRing(null);
      setIsDizzy(false);
      setScore(0);
      setGameInitialized(false);
    };
  
    return (
      <div className="vitamin-c-game">
        {showSuccess ? (
          <GameOverSuccess restartGame={restartGame} navigateHome={() => navigate('/')} setCompletedGames={setCompletedGames} />
        ) : showFail ? (
          <GameOverFail restartGame={restartGame} navigateHome={() => navigate('/')} />
        ) : !gameStarted ? (
          <IntroPage startGame={startGame} />
        ) : (
          <div className="game-container">
            <div className="game-header">
              <h2 className="text-2xl font-bold mb-2">Vitamin C: Virus Defense</h2>
              <p className="mb-4">Score: {score}</p>
            </div>
  
            <div 
              ref={gameAreaRef}
              className="gameplay-area"
              style={{
                width: '800px',
                height: '600px',
                position: 'relative',
                backgroundColor: '#f0f0f0',
                border: '2px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <img
                src="/assets/bloodcell.png"
                alt="Blood Cell"
                style={{
                  position: 'absolute',
                  left: playerPosition.x - 25,
                  top: playerPosition.y - 25,
                  width: '50px',
                  height: '50px',
                  transform: isDizzy ? 'rotate(360deg)' : 'none',
                  transition: isDizzy ? 'transform 2s' : 'none'
                }}
              />
  
              {viruses.map(virus => {
                if (Date.now() < virus.delay) return null;
                return (
                  <img
                    key={virus.id}
                    src={`/assets/virus${virus.type}.png`}
                    alt="Virus"
                    style={{
                      position: 'absolute',
                      left: virus.x - 20,
                      top: virus.y - 20,
                      width: '40px',
                      height: '40px'
                    }}
                  />
                );
              })}
  
              {foodRing.map((food, index) => (
                <img
                  key={index}
                  src={food.image}
                  alt={food.name}
                  onClick={(e) => handleFoodClick(food, e)}
                  style={{
                    position: 'absolute',
                    left: playerPosition.x + Math.cos(food.angle) * 100 - 20,
                    top: playerPosition.y + Math.sin(food.angle) * 100 - 20,
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                  }}
                />
              ))}
  
              {ring && (
                <div
                  style={{
                    position: 'absolute',
                    left: playerPosition.x - ring.radius,
                    top: playerPosition.y - ring.radius,
                    width: ring.radius * 2,
                    height: ring.radius * 2,
                    border: '4px solid yellow',
                    borderRadius: '50%',
                    opacity: 0.7,
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default VitaminC;