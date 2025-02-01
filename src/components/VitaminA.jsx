import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VitaminA.css';
import IntroPage from './VitaminAIntroPage';
import GameOverSuccess from './VitaminAGameOverSuccess';
import GameOverFail from './VitaminAGameOverFail';

const VitaminA = ({ setCompletedGames }) => {
  const [goodFoodsCollected, setGoodFoodsCollected] = useState(0);
  const [visionCleared, setVisionCleared] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [availableFoods, setAvailableFoods] = useState([]);
  const [popupText, setPopupText] = useState({ text: '', isGood: false, position: null });
  const [gameInitialized, setGameInitialized] = useState(false);
  const navigate = useNavigate();

  const goodFoods = [
    { image: '/assets/carrot.png', name: 'Carrot' },
    { image: '/assets/beefliver.png', name: 'Beef Liver' },
    { image: '/assets/sweetpotato.png', name: 'Sweet Potato' },
    { image: '/assets/spinach.png', name: 'Spinach' },
    { image: '/assets/broccoli.png', name: 'Broccoli' }
  ];

  const badFoods = [
    { image: '/assets/junk1.png', name: 'Soda' },
    { image: '/assets/junk2.png', name: 'Candy' },
    { image: '/assets/junk3.png', name: 'Pizza' },
    { image: '/assets/junk4.png', name: 'Ice Cream' },
    { image: '/assets/junk5.png', name: 'Chips' }
  ];

  useEffect(() => {
    if (gameStarted && !gameInitialized) {
      const allFoods = [...goodFoods, ...badFoods].map((food, index) => ({
        ...food,
        id: index,
        position: {
          left: Math.random() * (800 - 100),
          top: Math.random() * (400 - 100)
        }
      }));
      setAvailableFoods(allFoods);
      setGameInitialized(true);
    }
  }, [gameStarted, gameInitialized]);

  useEffect(() => {
    if (visionCleared >= 100) {
      setShowSuccess(true);
    }
    if (visionCleared <= 0) {
      setVisionCleared(0);
    }
  }, [visionCleared]);

  // Fixed game over fail condition check
  useEffect(() => {
    if (gameInitialized && availableFoods.length === 0 && !showSuccess && gameStarted) {
      const remainingGoodFoodsNeeded = Math.ceil((100 - visionCleared) / 20);
      if (remainingGoodFoodsNeeded > 0) {
        setShowFail(true);
      }
    }
  }, [availableFoods, showSuccess, gameStarted, gameInitialized, visionCleared]);

  const handleFoodClick = (food, position) => {
    const isGoodFood = goodFoods.some(goodFood => goodFood.image === food.image);
    
    if (isGoodFood) {
      setVisionCleared(prev => Math.min(100, prev + 20));
      setGoodFoodsCollected(prev => prev + 1);
    } else {
      setVisionCleared(prev => Math.max(0, prev - 20));
    }

    setPopupText({
      text: food.name,
      isGood: isGoodFood,
      position: position
    });

    setAvailableFoods(prev => prev.filter(f => f.id !== food.id));

    setTimeout(() => {
      setPopupText({ text: '', isGood: false, position: null });
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setGoodFoodsCollected(0);
    setVisionCleared(0);
    setGameStarted(false);
    setShowSuccess(false);
    setShowFail(false);
    setAvailableFoods([]);
    setGameInitialized(false);
  };

  return (
    <div className="vitamin-a-game" style={{ position: 'relative' }}>
      {showSuccess ? (
        <GameOverSuccess
          restartGame={restartGame}
          navigateHome={() => navigate('/')}
          setCompletedGames={setCompletedGames}  // Pass it down to GameOverSuccess
          vitamin="vitaminA"  // Pass the vitamin name to identify which game was completed
        />
      ) : showFail ? (
        <GameOverFail restartGame={restartGame} navigateHome={() => navigate('/')} />
      ) : (
        <>
          {!gameStarted ? (
            <IntroPage startGame={startGame} />
          ) : (
            <div className="game-container">
              <div className="game-header">
                <h2 className="text-2xl font-bold mb-2">Vitamin A: Clear Vision Quest</h2>
                <p className="mb-4">Collect Vitamin A-rich foods to clear up your blurry vision!</p>
                <div className="counter text-lg font-semibold">
                  Good Foods Collected: {goodFoodsCollected}
                </div>
              </div>

              {popupText.text && popupText.position && (
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(50% - 450px + ${popupText.position.left + 50}px)`,
                    top: `${popupText.position.top + 200}px`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: popupText.isGood ? '#22c55e' : '#ef4444',
                    zIndex: 1000,
                    pointerEvents: 'none',
                  }}
                >
                  {popupText.text}
                </div>
              )}

              <div 
                className="gameplay-area"
                style={{
                  filter: `blur(${10 - visionCleared / 10}px)`,
                  width: '900px',
                  height: '500px',
                  margin: '0 auto',
                  position: 'relative',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {availableFoods.map((food) => (
                  <div
                    key={food.id}
                    className="food-item-container"
                    style={{
                      position: 'absolute',
                      left: food.position.left,
                      top: food.position.top,
                    }}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="food-item"
                      style={{ 
                        width: '100px', 
                        height: '100px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onClick={() => handleFoodClick(food, food.position)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>
        {`
          .food-item:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default VitaminA;