import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';

const NumberGame = () => {
  const navigate = useNavigate();

  const [gameState, setGameState] = useState('START');
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);

  const maxLevel = 5;

  const getTimeLimit = (lvl) => {
    const limits = [0, 15.0, 12.0, 10.0, 8.0, 6.0];
    return limits[lvl];
  };

  const startLevel = useCallback((lvl) => {
    const shuffled = Array.from({ length: 9 }, (_, i) => i + 1).sort(
      () => Math.random() - 0.5
    );

    setNumbers(shuffled);
    setCurrentTarget(1);
    setLevel(lvl);
    setTimeLeft(getTimeLimit(lvl));
    setGameState('PLAY');
  }, []);

  useEffect(() => {
    let timer;

    if (gameState === 'PLAY' && parseFloat(timeLeft) > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const next = (parseFloat(prev) - 0.1).toFixed(1);
          return parseFloat(next) <= 0 ? 0 : next;
        });
      }, 100);
    } else if (gameState === 'PLAY' && parseFloat(timeLeft) <= 0) {
      setGameState('FAIL');
    }

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleNumberClick = (num) => {
    if (gameState !== 'PLAY') return;

    if (num === currentTarget) {
      if (num === 9) {
        if (level === maxLevel) setGameState('FINISH');
        else setGameState('SUCCESS');
      } else {
        setCurrentTarget((prev) => prev + 1);
      }
    }
  };

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      margin: '0 auto',
      backgroundColor: '#FFFBEB',
      fontFamily: '"Pretendard", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      padding: '50px 20px 20px',
      textAlign: 'center',
      backgroundColor: '#FEF3C7',
      borderBottomLeftRadius: '40px',
      borderBottomRightRadius: '40px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    },
    title: { fontSize: '28px', fontWeight: '900', color: '#92400E', margin: 0 },
    timerText: {
      fontSize: '50px',
      fontWeight: '900',
      color: parseFloat(timeLeft) < 3 ? '#EF4444' : '#EA580C',
      marginTop: '5px',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px',
    },
    levelText: { fontSize: '22px', fontWeight: '800', color: '#B45309', marginBottom: '10px' },

    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '12px',
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '35px',
      boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: '360px',
      boxSizing: 'border-box',
      border: '3px solid #FEF3C7',
      margin: '0 auto',
    },

    numBtn: (num, isMatched) => ({
      width: '100%',
      aspectRatio: '1 / 1', 
      borderRadius: '20px',
      fontSize: '32px',
      fontWeight: '900',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: isMatched ? '#F3F4F6' : num === currentTarget ? '#FB923C' : '#FFFFFF',
      color: isMatched ? '#D1D5DB' : num === currentTarget ? 'white' : '#374151',

      border: isMatched ? 'none' : '1px solid #E5E7EB',
      boxShadow: isMatched ? 'none' : '0 6px 0 #EA580C',
      transform: isMatched ? 'translateY(6px)' : 'none',
      transition: 'all 0.1s',
      boxSizing: 'border-box',
    }),

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 251, 235, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px',
      textAlign: 'center',
    },
    bigBtn: {
      width: '240px',
      padding: '18px',
      backgroundColor: '#EA580C',
      color: 'white',
      borderRadius: '60px',
      border: 'none',
      fontSize: '24px',
      fontWeight: '900',
      marginTop: '30px',
      boxShadow: '0 8px 0 #9A3412',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>숫자 기차 톡톡 🚂</h1>
        <div style={styles.timerText}>⌛ {timeLeft}</div>
      </header>

      <main style={styles.main}>
        <div style={styles.levelText}>단계: {level} / 5</div>
        <p style={{ fontSize: '20px', fontWeight: '800', color: '#666', marginBottom: '15px' }}>
          누를 숫자:{' '}
          <span style={{ color: '#EA580C', fontSize: '32px' }}>{currentTarget}</span>
        </p>

        <div style={styles.grid}>
          {numbers.map((num) => (
            <button
              key={num}
              type="button"
              style={styles.numBtn(num, num < currentTarget)}
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </main>

      {/* START */}
      {gameState === 'START' && (
        <div style={styles.overlay}>
          <div style={{ fontSize: '120px' }}>🚂</div>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#92400E' }}>숫자 기차 출발!</h2>
          <button type="button" style={styles.bigBtn} onClick={() => startLevel(1)}>
            시작하기 🚀
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {gameState === 'SUCCESS' && (
        <div style={styles.overlay}>
          <div style={{ fontSize: '100px' }}>🎉</div>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#EA580C' }}>성공!</h2>
          <button type="button" style={styles.bigBtn} onClick={() => startLevel(level + 1)}>
            다음 단계로 ➡️
          </button>
        </div>
      )}

      {/* FAIL */}
      {gameState === 'FAIL' && (
        <div style={styles.overlay}>
          <div style={{ fontSize: '100px' }}>⏰</div>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#EF4444' }}>시간 초과!</h2>
          <button
            type="button"
            style={{ ...styles.bigBtn, backgroundColor: '#4B5563', boxShadow: '0 8px 0 #1F2937' }}
            onClick={() => startLevel(1)}
          >
            다시 도전 🔄
          </button>
        </div>
      )}

      {/* FINISH */}
      {gameState === 'FINISH' && (
        <div style={styles.overlay}>
          <div style={{ fontSize: '100px' }}>🏆</div>
          <h2 style={{ fontSize: '40px', fontWeight: '950', color: '#EA580C' }}>최종 승리!</h2>
          <button type="button" style={styles.bigBtn} onClick={() => startLevel(1)}>
            한 번 더 하기 🔄
          </button>
          <button
            type="button"
            style={{ ...styles.bigBtn, backgroundColor: '#374151', marginTop: '10px' }}
            onClick={() => navigate('/game-select')}
          >
            목록으로
          </button>
        </div>
      )}

      <footer style={{ padding: '20px 30px 40px' }}>
        <BackButton onClick={() => navigate('/game-select')} />
      </footer>
    </div>
  );
};

export default NumberGame;
