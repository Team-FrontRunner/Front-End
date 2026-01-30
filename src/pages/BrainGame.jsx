import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';

const BrainGame = () => {
  const navigate = useNavigate();
  
  const [gameState, setGameState] = useState('START'); 
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [level, setLevel] = useState(1);
  const maxLevels = 5;

  const startNextLevel = useCallback((isNewGame = false) => {
    const nextLevel = isNewGame ? 1 : level + 1;
    if (!isNewGame && level >= maxLevels) {
      setGameState('RESULT');
      return;
    }
    if (isNewGame) setLevel(1);
    else setLevel(nextLevel);

    const newSequence = [];
    const sequenceLength = isNewGame ? 3 : nextLevel + 2;
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * 9));
    }
    setSequence(newSequence);
    setUserSequence([]);
    setGameState('SHOW');
  }, [level]);

  useEffect(() => {
    if (gameState === 'SHOW') {
      let i = 0;
      const interval = setInterval(() => {
        setActiveIndex(sequence[i]);
        setTimeout(() => setActiveIndex(null), 600);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => setGameState('PLAY'), 1000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState, sequence]);

  const handleTileClick = (index) => {
    if (gameState !== 'PLAY') return;
    const nextUserSeq = [...userSequence, index];
    setUserSequence(nextUserSeq);
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 300);
    if (index !== sequence[nextUserSeq.length - 1]) {
      setGameState('FAIL');
      return;
    }
    if (nextUserSeq.length === sequence.length) {
      setGameState('SUCCESS');
    }
  };

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#F3F4F6', fontFamily: '"Pretendard", sans-serif',
      display: 'flex', flexDirection: 'column',
      padding: '20px', boxSizing: 'border-box',
      position: 'relative'
    },
    title: { fontSize: '32px', fontWeight: '900', textAlign: 'center', marginTop: '40px' },
    statusMsg: { 
      fontSize: '26px', fontWeight: '800', textAlign: 'center', 
      margin: '15px 0', color: gameState === 'SHOW' ? '#EF4444' : '#84CC16',
      minHeight: '32px' 
    },
    grid: {
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
      padding: '15px', backgroundColor: '#FFF', borderRadius: '30px', 
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', boxSizing: 'border-box'
    },
    tile: (index) => ({
      height: '115px', borderRadius: '25px', border: 'none',
      backgroundColor: activeIndex === index ? '#84CC16' : '#E5E7EB',
      transition: 'background-color 0.2s', cursor: 'pointer',
      boxShadow: activeIndex === index ? '0 0 25px #84CC16' : '0 6px 0 #D1D5DB',
      transform: activeIndex === index ? 'scale(0.95)' : 'scale(1)',
    }),
    // --- [수정] 중앙 버튼 크기를 살짝 줄임 ---
    centerBtn: {
      width: '230px', // 280px -> 230px
      padding: '16px', // 22px -> 16px
      backgroundColor: '#374151', color: 'white',
      borderRadius: '50px', border: 'none', 
      fontSize: '20px', // 24px -> 20px
      fontWeight: '900', 
      marginTop: '20px' // 여백 조정
    },
    // --- [수정] 돌아가기 버튼 원래 위치로 ---
    backButtonWrapper: {
      position: 'absolute',
      bottom: '40px',
      left: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>길 따라가기 👣</h1>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 시작 화면 */}
        {gameState === 'START' && (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>👣</div>
            <p style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.6' }}>
              돌이 반짝이는 순서를<br/>기억해서 따라 누르세요!
            </p>
            <button style={{ ...styles.centerBtn, backgroundColor: '#84CC16' }} onClick={() => startNextLevel(true)}>시작하기 🚀</button>
          </div>
        )}

        {/* 게임 진행 화면 */}
        {(gameState === 'SHOW' || gameState === 'PLAY' || gameState === 'SUCCESS' || gameState === 'FAIL') && (
          <>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#6B7280', marginTop: '5px' }}>단계: {level} / {maxLevels}</p>
            <p style={styles.statusMsg}>
              {gameState === 'SHOW' ? '👀 잘 보세요!' : 
               gameState === 'PLAY' ? '👆 따라 누르세요!' : 
               gameState === 'SUCCESS' ? '🎉 맞았습니다!' : '😢 틀렸습니다!'}
            </p>
            <div style={styles.grid}>
              {[...Array(9)].map((_, i) => (
                <button key={i} style={styles.tile(i)} onClick={() => handleTileClick(i)} />
              ))}
            </div>
            {gameState === 'SUCCESS' && (
              <button style={{ ...styles.centerBtn, backgroundColor: '#84CC16' }} onClick={() => startNextLevel()}>
                {level === maxLevels ? '결과 확인하기 🏆' : '다음 단계로 ➡️'}
              </button>
            )}
            {gameState === 'FAIL' && (
              <button style={{ ...styles.centerBtn, backgroundColor: '#EF4444' }} onClick={() => startNextLevel(true)}>다시 시작 🔄</button>
            )}
          </>
        )}

        {/* 결과 화면 */}
        {gameState === 'RESULT' && (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ fontSize: '100px' }}>🏆</div>
            <h2 style={{ fontSize: '40px', fontWeight: '950' }}>미션 완료!</h2>
            <p style={{ fontSize: '22px', color: '#4B5563', margin: '20px 0' }}>{maxLevels}단계를 모두 통과했습니다!</p>
            <button style={{ ...styles.centerBtn, backgroundColor: '#84CC16' }} onClick={() => startNextLevel(true)}>한 번 더 하기 🔄</button>
          </div>
        )}
      </div>

      {/* --- [수정] 돌아가기 버튼 위치 복구 --- */}
      <div style={styles.backButtonWrapper}>
        <BackButton onClick={() => navigate('/game-select')} />
      </div>
    </div>
  );
};

export default BrainGame;