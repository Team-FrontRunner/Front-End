import React, { useState, useEffect, useRef } from 'react';

const CardGame = () => {
  const celebrityIcons = [
    { name: '임영웅', img: '../cardGameIMG/임영웅.png' },
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
  const [wrongMessage, setWrongMessage] = useState('');
  const [feedback, setFeedback] = useState({ indices: [], type: '' });
  const timerRef = useRef(null);

  // 게임 초기화 및 다시하기 로직
  const initGame = (e) => {
    if (e) e.stopPropagation(); // 버튼 클릭 이벤트 전파 방지

    // 1. 기존 타이머 및 상태 완전 리셋
    if (timerRef.current) clearInterval(timerRef.current);
    setMatchedIndices([]);
    setFlippedIndices([]);
    setTimer(0);
    setWrongMessage('');
    setFeedback({ indices: [], type: '' });

    // 2. 카드 섞기
    const deck = [...celebrityIcons, ...celebrityIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: Math.random() + index })); // 고유 ID 부여
    setCards(deck);

    // 3. 미리보기 시작
    setGameState('PREVIEW');

    // 4. 3초 후 게임 시작
    setTimeout(() => {
      setGameState('PLAYING');
      startTimer();
    }, 3000);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handleCardClick = (index) => {
    if (gameState !== 'PLAYING' || flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      
      if (cards[first].name === cards[second].name) {
        // 정답 효과
        setFeedback({ indices: [first, second], type: 'correct' });
        setMatchedIndices((prev) => {
          const updated = [...prev, first, second];
          if (updated.length === cards.length) {
            clearInterval(timerRef.current);
            setTimeout(() => setGameState('FINISHED'), 500);
          }
          return updated;
        });
        setTimeout(() => {
          setFlippedIndices([]);
          setFeedback({ indices: [], type: '' });
        }, 500);
      } else {
        // 오답 효과 및 메시지
        setFeedback({ indices: [first, second], type: 'wrong' });
        setWrongMessage('할매 스트레스 많이 받을거야~');
        setTimeout(() => {
          setFlippedIndices([]);
          setFeedback({ indices: [], type: '' });
          setWrongMessage('');
        }, 800);
      }
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}분 ${s}초`;
  };

  const styles = {
    container: { width: '390px', height: '844px', backgroundColor: '#FFFFFF', margin: '0 auto', display: 'flex', flexDirection: 'column', fontFamily: '"Pretendard", sans-serif', position: 'relative', overflow: 'hidden' },
    header: { padding: '50px 20px 20px', textAlign: 'center' },
    titleBadge: { backgroundColor: '#F0F0F0', padding: '10px 30px', borderRadius: '12px', display: 'inline-block' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '15px', perspective: '1000px' },
    card: { height: '100px', position: 'relative', transformStyle: 'preserve-3d', transition: 'transform 0.5s', cursor: 'pointer' },
    cardFace: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #ddd' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    startBtn: { padding: '15px 40px', fontSize: '20px', fontWeight: '900', backgroundColor: '#84CC16', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 0 #65A30D', zIndex: 101 }
  };

  return (
    <div style={styles.container}>
      {/* 시작 화면 */}
      {gameState === 'READY' && (
        <div style={styles.overlay}>
          <h2 style={{ marginBottom: '20px' }}>두뇌 회전 카드 게임</h2>
          <button style={styles.startBtn} onClick={(e) => initGame(e)}>시작하기</button>
        </div>
      )}

      {/* 종료 화면 */}
      {gameState === 'FINISHED' && (
        <div style={styles.overlay}>
          <h2 style={{ color: '#84CC16' }}>🎉 미션 성공!</h2>
          <p style={{ fontSize: '18px', margin: '10px 0 20px' }}>기록: {formatTime(timer)}</p>
          <button style={styles.startBtn} onClick={(e) => initGame(e)}>다시 하기</button>
        </div>
      )}

      <header style={styles.header}>
        <div style={styles.titleBadge}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>카드 맞추기</h1>
        </div>
        <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#666' }}>
          시간: {formatTime(timer)}
        </div>
        <div style={{ height: '24px', marginTop: '10px', color: '#EF4444', fontWeight: 'bold', fontSize: '14px' }}>
          {wrongMessage}
        </div>
      </header>

      <main style={styles.grid}>
        {cards.map((card, index) => {
          const isFlipped = gameState === 'PREVIEW' || flippedIndices.includes(index) || matchedIndices.includes(index);
          const isFeedback = feedback.indices.includes(index);
          
          let bgColor = 'white';
          let borderColor = '#ddd';
          if (isFeedback) {
            bgColor = feedback.type === 'correct' ? '#DCFCE7' : '#FEE2E2';
            borderColor = feedback.type === 'correct' ? '#22C55E' : '#EF4444';
          }

          return (
            <div 
              key={card.id} 
              style={{ ...styles.card, transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
              onClick={() => handleCardClick(index)}
            >
              <div style={{ ...styles.cardFace, backgroundColor: '#f3f4f6', color: '#ccc' }}>?</div>
              <div style={{ 
                ...styles.cardFace, 
                transform: 'rotateY(180deg)', 
                backgroundColor: bgColor,
                border: isFeedback ? `2px solid ${borderColor}` : '1px solid #ddd'
              }}>
                <img src={card.img} alt={card.name} style={{ width: '90%', height: '90%', objectFit: 'cover', borderRadius: '4px' }} 
                     onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                <span style={{ fontSize: '20px', display: 'none' }}>{card.name}</span>
              </div>
            </div>
          );
        })}
      </main>

      <footer style={{ marginTop: 'auto', padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          맞춘 카드: <span style={{ color: '#84CC16' }}>{matchedIndices.length / 2}</span> / 8
        </div>
        <button 
          onClick={() => setGameState('READY')}
          style={{ background: 'none', border: 'none', marginTop: '20px', fontSize: '16px', color: '#999', cursor: 'pointer' }}
        >
          ← 돌아가기
        </button>
      </footer>
    </div>
  );
};

export default CardGame;