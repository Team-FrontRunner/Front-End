import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. BackButton 컴포넌트를 불러옵니다.
import BackButton from '../components/common/backButton';

const CardGame = () => {
  const navigate = useNavigate();
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

  const wrongMessages = [
    "그런 스트레스도 필요해!", "두뇌가 말랑해지는 중", "다시 한번 해볼까요?", 
    "아...아쉬워요~", "포기하지 마세요!", "화이팅! 다시 도전!", 
    "조금만 더 집중해봐요!", "거의 다 왔어요!", "다음엔 꼭 맞출 수 있어요!", 
    "실수는 누구나 해요!", "계속 도전하면 성공할 거예요!", "포기하지 말고 계속해요!",
  ];

  const [gameState, setGameState] = useState('READY');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [timer, setTimer] = useState(0);
  const [wrongMessage, setWrongMessage] = useState('');
  const [feedback, setFeedback] = useState({ indices: [], type: '' });
  const timerRef = useRef(null);

  const initGame = (e) => {
    if (e) e.stopPropagation();
    if (timerRef.current) clearInterval(timerRef.current);
    setMatchedIndices([]);
    setFlippedIndices([]);
    setTimer(0);
    setWrongMessage('');
    setFeedback({ indices: [], type: '' });

    const deck = [...celebrityIcons, ...celebrityIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: Math.random() + index }));
    setCards(deck);

    setGameState('PREVIEW');
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
        setFeedback({ indices: [first, second], type: 'wrong' });
        const randomIdx = Math.floor(Math.random() * wrongMessages.length);
        setWrongMessage(wrongMessages[randomIdx]);
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
    container: { width: '390px', height: '844px', backgroundColor: '#fffbf0', margin: '0 auto', display: 'flex', flexDirection: 'column', fontFamily: '"Pretendard", sans-serif', fontSize: '30px', position: 'relative', overflow: 'hidden' },
    header: { padding: '50px 20px 20px', textAlign: 'center' },
    titleBadge: { backgroundColor: '#F0F0F0', padding: '10px 30px', borderRadius: '12px', display: 'inline-block' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '15px', perspective: '1000px' },
    card: { height: '100px', position: 'relative', transformStyle: 'preserve-3d', transition: 'transform 0.5s', cursor: 'pointer' },
    cardFace: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', border: '1px solid #ddd' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,251,240,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    startBtn: { padding: '15px 40px', fontSize: '30px', fontWeight: '900', backgroundColor: '#84CC16', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 0 #65A30D' }
  };

  return (
    <div style={styles.container}>
      {gameState === 'READY' && (
        <div style={styles.overlay}>
          <h2 style={{ marginBottom: '10px', fontSize: '35px', fontWeight: '700' }}>두뇌 회전 카드 게임</h2>
          <button style={styles.startBtn} onClick={initGame}>시작하기</button>
        </div>
      )}

      {gameState === 'FINISHED' && (
        <div style={styles.overlay}>
          <h2 style={{ color: '#84CC16' }}>🎉 미션 성공!</h2>
          <p style={{ fontSize: '30px', margin: '10px 0 20px' }}>기록: {formatTime(timer)}</p>
          <button style={styles.startBtn} onClick={initGame}>다시 하기</button>
        </div>
      )}

      <header style={styles.header}>
        <div style={styles.titleBadge}>
          <h1 style={{ margin: 0, fontSize: '30px' }}>카드 맞추기</h1>
        </div>
        <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#666' }}>
          시간: {formatTime(timer)}
        </div>
        <div style={{ height: '30px', marginTop: '10px', color: '#EF4444', fontWeight: 'bold', fontSize: '30px' }}>
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
                <span style={{ fontSize: '30px', display: 'none' }}>{card.name}</span>
              </div>
            </div>
          );
        })}
      </main>

      {/* 2. 푸터의 버튼을 컴포넌트로 교체했습니다. */}
      <footer style={{ marginTop: 'auto', padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
          맞춘 카드: <span style={{ color: '#84CC16' }}>{matchedIndices.length / 2}</span> / 8
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <BackButton onClick={() => navigate('/game-select')} />
        </div>
      </footer>
    </div>
  );
};

export default CardGame;