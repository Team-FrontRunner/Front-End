import React, { useState, useEffect, useRef } from 'react';

const CardGame = () => {
  // 카드 데이터 (업로드된 이미지와 기본 이모지 조합)
  const celebrityIcons = [
    { name: '임영웅', img: '../cardGameIMG/임영웅.png' }, // 실제 프로젝트 시 로컬 경로로 수정
    { name: '영탁', img: '../cardGameIMG/영탁.png' },
    { name: '이찬원', img: '../cardGameIMG/이찬원.png' },
    { name: '박서진', img: '../cardGameIMG/박서진.png' },
    { name: '정동원', img: '../cardGameIMG/정동원.png' },
    { name: '장민호', img: '../cardGameIMG/장민호.png' },
    { name: '남진', img: '../cardGameIMG/남진.png' },
    { name: '진성', img: '../cardGameIMG/진성.png' }
  ];

  const [gameState, setGameState] = useState('READY'); // READY, PREVIEW, PLAYING, FINISHED
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  // 게임 초기화
  const initGame = () => {
    const deck = [...celebrityIcons, ...celebrityIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }));
    setCards(deck);
    setMatchedIndices([]);
    setFlippedIndices([]);
    setTimer(0);
    setGameState('PREVIEW');

    // 3초 동안 미리보기 후 게임 시작
    setTimeout(() => {
      setGameState('PLAYING');
      startTimer();
    }, 3000);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}분 ${s}초`;
  };

  const handleCardClick = (index) => {
    if (gameState !== 'PLAYING' || flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setMatchedIndices((prev) => {
          const updated = [...prev, first, second];
          if (updated.length === cards.length) {
            clearInterval(timerRef.current);
            setGameState('FINISHED');
          }
          return updated;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 800);
      }
    }
  };

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      backgroundColor: '#FFFFFF',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Pretendard", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      padding: '50px 20px 20px',
      textAlign: 'center'
    },
    titleBadge: {
      backgroundColor: '#F0F0F0',
      padding: '10px 30px',
      borderRadius: '12px',
      display: 'inline-block'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      padding: '15px',
      perspective: '1000px'
    },
    card: {
      height: '100px',
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.5s',
      cursor: 'pointer'
    },
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      border: '1px solid #ddd'
    },
    overlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    },
    startBtn: {
      padding: '15px 40px',
      fontSize: '20px',
      fontWeight: '900',
      backgroundColor: '#84CC16',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0 4px 0 #65A30D'
    }
  };

  return (
    <div style={styles.container}>
      {/* 시작 및 종료 오버레이 */}
      {gameState === 'READY' && (
        <div style={styles.overlay}>
          <h2 style={{ marginBottom: '20px' }}>두뇌 회전 카드 게임</h2>
          <button style={styles.startBtn} onClick={initGame}>시작하기</button>
        </div>
      )}

      {gameState === 'FINISHED' && (
        <div style={styles.overlay}>
          <h2 style={{ color: '#84CC16' }}>🎉 미션 성공!</h2>
          <p style={{ fontSize: '18px', margin: '10px 0 20px' }}>기록: {formatTime(timer)}</p>
          <button style={styles.startBtn} onClick={initGame}>다시 하기</button>
        </div>
      )}

      <header style={styles.header}>
        <div style={styles.titleBadge}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>카드 맞추기</h1>
        </div>
        <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#666' }}>
          시간: {formatTime(timer)}
        </div>
      </header>

      <main style={styles.grid}>
        {cards.map((card, index) => {
          const isFlipped = gameState === 'PREVIEW' || flippedIndices.includes(index) || matchedIndices.includes(index);
          return (
            <div 
              key={card.id} 
              style={{ ...styles.card, transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
              onClick={() => handleCardClick(index)}
            >
              {/* 뒷면 */}
              <div style={{ ...styles.cardFace, backgroundColor: '#f3f4f6', color: '#ccc' }}>?</div>
              {/* 앞면 */}
              <div style={{ ...styles.cardFace, transform: 'rotateY(180deg)', backgroundColor: 'white' }}>
                {card.img.length > 5 ? (
                  <img src={card.img} alt={card.name} style={{ width: '90%', height: '90%', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <span style={{ fontSize: '32px' }}>{card.img}</span>
                )}
              </div>
            </div>
          );
        })}
      </main>

      <footer style={{ marginTop: 'auto', padding: '30px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          맞춘 카드: <span style={{ color: '#84CC16' }}>{matchedIndices.length / 2}</span> / 8
        </div>
        <button style={{ background: 'none', border: 'none', marginTop: '20px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
          ← 돌아가기
        </button>
      </footer>
    </div>
  );
};

export default CardGame;