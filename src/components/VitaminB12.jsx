import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VitaminB12.css';
import VitaminBIntroPage from './VitaminBIntroPage';
import VitaminBGameOverSuccess from './VitaminBGameOverSuccess';
import VitaminBGameOverFail from './VitaminBGameOverFail';

const VitaminB12 = ({ setCompletedGames }) => {
  const navigate = useNavigate();
  const TRACK_LENGTH = 5000;
  const VIEW_WIDTH = 800;
  const INITIAL_SPEED = 4;
  const MAX_SPEED = 8;
  const MIN_SPEED = 3;
  const INITIAL_PLAYER_SPEED = INITIAL_SPEED;
  const FOOD_SPAWN_INTERVAL = 2000; // Spawn food every 2 seconds
  const MIN_FOOD_SPACING = 100;
  
  const BOT_SPEEDS = {
    BOT1: 4.1,  // Slightly faster than player
    BOT2: 3.7,  // Slower than player
    BOT3: 4.3   // Fast but not overwhelming
  };
  
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [viewOffset, setViewOffset] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speedBoosts, setSpeedBoosts] = useState([]);
  const [lastSpawnPosition, setLastSpawnPosition] = useState(0);
  
  // Player states - now with 4 lanes
  const [playerLane, setPlayerLane] = useState(1);
  const [playerSpeed, setPlayerSpeed] = useState(INITIAL_PLAYER_SPEED);
  const [playerPosition, setPlayerPosition] = useState(0);
  
  // Bot states - now with unique personalities
  const [botPositions, setBotPositions] = useState([
    { 
      id: 1, 
      lane: 0, 
      position: 0, 
      speed: BOT_SPEEDS.BOT1, 
      color: '#FF4444', 
      moveTimer: 50,
      aggressiveness: 0.3,  // Reduced from 0.7
      laneChangeCooldown: 0 // New property to limit lane changes
    },
    { 
      id: 2, 
      lane: 2, 
      position: 0, 
      speed: BOT_SPEEDS.BOT2, 
      color: '#333333', 
      moveTimer: 70,
      aggressiveness: 0.2,  // Reduced from 0.4
      laneChangeCooldown: 0
    },
    { 
      id: 3, 
      lane: 3, 
      position: 0, 
      speed: BOT_SPEEDS.BOT3, 
      color: '#1B5E20', 
      moveTimer: 30,
      aggressiveness: 0.4,  // Reduced from 0.9
      laneChangeCooldown: 0
    }
  ]);

  // Food states remain the same
  const [foods, setFoods] = useState([]);

  const goodFoods = [
    { image: '/assets/eggs.png', name: 'Eggs', speedBoost: 2 },
    { image: '/assets/fish.png', name: 'Fish', speedBoost: 2 },
    { image: '/assets/milk.png', name: 'Milk', speedBoost: 2 }
  ];

  const badFoods = [
    { image: '/assets/junk1.png', name: 'Fries', speedPenalty: -1 },
    { image: '/assets/junk2.png', name: 'Candy', speedPenalty: -1 }
  ];

  // Initialize food positions - adjusted for 4 lanes
  useEffect(() => {
    const generateFoods = () => {
      const newFoods = [];
      for (let i = 0; i < 150; i++) {
        const lane = Math.floor(Math.random() * 4); // Now 4 lanes
        const isGood = Math.random() > 0.4;
        const foodType = isGood 
          ? goodFoods[Math.floor(Math.random() * goodFoods.length)]
          : badFoods[Math.floor(Math.random() * badFoods.length)];
        
        newFoods.push({
          id: i,
          lane,
          position: 200 + i * 100 + Math.random() * 50,
          ...foodType,
          isGood
        });
      }
      setFoods(newFoods);
    };

    if (gameStarted) {
      generateFoods();
    }
  }, [gameStarted]);

  // Handle lane changes - adjusted for 4 lanes
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!gameStarted || gameOver) return;
      
      if (event.key === 'ArrowUp' && playerLane > 0) {
        setPlayerLane(prev => prev - 1);
      }
      if (event.key === 'ArrowDown' && playerLane < 3) { // Now can go to lane 3
        setPlayerLane(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, playerLane]);

  // Enhanced bot AI
  const calculateBotMove = (bot, playerPosition, foods) => {
    // Don't change lanes if on cooldown
    if (bot.laneChangeCooldown > 0) {
      return bot.lane;
    }
  
    const isAheadSignificantly = bot.position >= playerPosition + 200;
    
    const nearbyFoods = foods.filter(food => 
      Math.abs(food.position - bot.position) < 100 && 
      Math.abs(food.lane - bot.lane) <= 1
    );
  
    // Ignore foods that are closer to the player
    const availableFoods = nearbyFoods.filter(food => 
      Math.abs(food.position - bot.position) < Math.abs(food.position - playerPosition)
    );
  
    // Find best food target based on position
    let bestFood = availableFoods.reduce((best, food) => {
      if (!best) return food;
      
      // If bot is significantly ahead, prefer bad food
      if (isAheadSignificantly) {
        if (!food.isGood && best.isGood) return food;
        if (food.isGood === best.isGood) {
          return Math.abs(food.position - bot.position) < Math.abs(best.position - bot.position)
            ? food : best;
        }
      } else {
        // Normal behavior when not ahead
        if (food.isGood && !best.isGood) return food;
        if (food.isGood === best.isGood) {
          return Math.abs(food.position - bot.position) < Math.abs(best.position - bot.position)
            ? food : best;
        }
      }
      return best;
    }, null);
  
    let targetLane = bot.lane;
    
    if (bestFood) {
      if (isAheadSignificantly) {
        // When ahead, 60% chance to pursue bad food
        if (!bestFood.isGood && Math.random() < 0.6) {
          targetLane = bestFood.lane;
        }
      } else {
        // Normal behavior when not ahead
        if (bestFood.isGood && Math.random() < 0.5) {
          targetLane = bestFood.lane;
        }
      }
    } else if (Math.random() < bot.aggressiveness && 
               Math.abs(playerPosition - bot.position) < 100) {
      if (Math.random() < 0.3) {
        targetLane = playerLane;
      }
    }
  
    // Ensure lane is valid
    targetLane = Math.max(0, Math.min(3, targetLane));
    
    // Only return new lane if it's different (triggers cooldown)
    return targetLane !== bot.lane ? targetLane : bot.lane;
  };

  // Main game loop with enhanced bot behavior
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameInterval = setInterval(() => {
      // Update player position and distance
      setPlayerPosition(prev => prev + playerSpeed);
      setDistance(prev => Math.floor(playerPosition / 10));
      setViewOffset(Math.max(0, playerPosition - VIEW_WIDTH / 3));

      // Handle speed boosts decay
      setSpeedBoosts(prev => prev.map(boost => ({
        ...boost,
        duration: boost.duration - 1
      })).filter(boost => boost.duration > 0));

      // Calculate current speed based on active boosts
      const baseSpeed = INITIAL_SPEED;
      const totalBoost = speedBoosts.reduce((sum, boost) => sum + boost.amount, 0);
      setPlayerSpeed(Math.min(MAX_SPEED, Math.max(MIN_SPEED, baseSpeed + totalBoost)));

      // Update bots with enhanced AI
      setBotPositions(prev => prev.map(bot => {
        const targetLane = calculateBotMove(bot, playerPosition, foods);
        let newSpeed = bot.speed;
        let newCooldown = Math.max(0, bot.laneChangeCooldown - 1);

        // Set new cooldown if lane changed
        if (targetLane !== bot.lane) {
          newCooldown = 60; // About 3 seconds before next lane change
        }

        // More balanced speed adjustment
        const distanceToPlayer = playerPosition - bot.position;
        if (distanceToPlayer > 400) { // Increased distance threshold
          newSpeed = Math.min(MAX_SPEED - 0.5, bot.speed + 0.1);
        } else if (distanceToPlayer < -400) {
          newSpeed = Math.max(MIN_SPEED, bot.speed - 0.05);
        }

        // Less aggressive catchup
        if (bot.position < playerPosition - 600) { // Increased threshold
          newSpeed = Math.min(MAX_SPEED - 0.5, bot.speed + 0.15);
        }

        return {
          ...bot,
          position: bot.position + newSpeed,
          lane: targetLane,
          speed: newSpeed,
          laneChangeCooldown: newCooldown
        };
      }));

      setFoods(prevFoods => 
        prevFoods.filter(food => {
          const playerCollision = 
            food.lane === playerLane && 
            Math.abs(food.position - playerPosition) < 30;
          
          if (playerCollision) {
            if (food.isGood) {
              setSpeedBoosts(prev => [...prev, {
                id: Date.now(),
                amount: 2,
                duration: 100
              }]);
            } else {
              setSpeedBoosts(prev => [...prev, {
                id: Date.now(),
                amount: -1.5,
                duration: 60
              }]);
            }
            return false;
          }

          const botCollision = botPositions.some(bot => 
            bot.lane === food.lane && 
            Math.abs(food.position - bot.position) < 30
          );

          if (botCollision) {
            setBotPositions(prev => prev.map(bot => {
              if (bot.lane === food.lane && Math.abs(food.position - bot.position) < 30) {
                const speedChange = food.isGood ? 1.8 : -1.2; // Increased impact of food
                const newSpeed = food.isGood ? 
                  Math.min(MAX_SPEED - 0.5, bot.speed + speedChange) : 
                  Math.max(MIN_SPEED, bot.speed + speedChange);
                return { ...bot, speed: newSpeed };
              }
              return bot;
            }));
            return false;
          }

          return true;
        })
      );

      // Win/lose condition
      if (playerPosition >= TRACK_LENGTH) {
        const playerRank = [
          ...botPositions.map(bot => bot.position),
          playerPosition
        ].sort((a, b) => b - a).indexOf(playerPosition);
        
        setGameWon(playerRank === 0);
        setGameOver(true);
      }
    }, 50);

    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, playerPosition, playerSpeed, playerLane, botPositions, speedBoosts, foods]);

  const startGame = () => setGameStarted(true);
  
  const restartGame = () => {
    setPlayerLane(1);
    setPlayerSpeed(INITIAL_SPEED);
    setPlayerPosition(0);
    setViewOffset(0);
    setDistance(0);
    setBotPositions([
      { 
        id: 1, 
        lane: 0, 
        position: 0, 
        speed: BOT_SPEEDS.BOT1, 
        color: '#FF4444', 
        moveTimer: 50,
        aggressiveness: 0.7
      },
      { 
        id: 2, 
        lane: 2, 
        position: 0, 
        speed: BOT_SPEEDS.BOT2, 
        color: '#333333', 
        moveTimer: 70,
        aggressiveness: 0.4
      },
      { 
        id: 3, 
        lane: 3, 
        position: 0, 
        speed: BOT_SPEEDS.BOT3, 
        color: '#1B5E20', 
        moveTimer: 30,
        aggressiveness: 0.9
      }
    ]);
    setFoods([]);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="vitamin-b12-game">
      {!gameStarted ? (
        <VitaminBIntroPage startGame={startGame} />
      ) : gameOver ? (
        gameWon ? (
          <VitaminBGameOverSuccess restartGame={restartGame} navigateHome={() => navigate('/')} setCompletedGames={setCompletedGames} />
        ) : (
          <VitaminBGameOverFail restartGame={restartGame} navigateHome={() => navigate('/')} />
        )
      ) : (
        <div className="game-wrapper">
          <div className="game-stats">
            <h2>Vitamin B12 Sprint Race</h2>
            <p>Distance: {distance}m / 500m</p>
          </div>

          <div className="viewport">
            <div 
              className="race-track"
              style={{ 
                transform: `translateX(-${viewOffset}px)`,
                width: `${TRACK_LENGTH}px`
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="distance-marker"
                  style={{ left: `${(i + 1) * 1000}px` }}
                >
                  {(i + 1) * 100}m
                </div>
              ))}

              <div 
                className="finish-line"
                style={{ left: `${TRACK_LENGTH - 50}px` }}
              />

              {[0, 1, 2, 3].map(lane => (
                <div key={lane} className="lane">
                  {botPositions.map((bot) => 
                    bot.lane === lane && (
                      <div 
                        key={bot.id}
                        className="runner bot"
                        style={{ 
                          left: `${bot.position}px`,
                          backgroundColor: bot.color
                        }}
                      />
                    )
                  )}

                  {playerLane === lane && (
                    <div 
                      className="runner player"
                      style={{ left: `${playerPosition}px` }}
                    >
                      <div className="eyes">
                        <div className="eye" />
                        <div className="eye" />
                      </div>
                    </div>
                  )}

                  {foods.map(food => 
                    food.lane === lane && (
                      <img
                        key={food.id}
                        src={food.image}
                        alt={food.name}
                        className={`food ${food.isGood ? 'good' : 'bad'}`}
                        style={{ left: `${food.position}px` }}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitaminB12;