import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';

const OddOneOut = () => {
  const navigate = useNavigate();
  
  const [gameState, setGameState] = useState('START');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  
  // --- [추가] 피드백 상태 (null, 'correct', 'wrong') ---
  const [feedback, setFeedback] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const quizData = [
    { 
      question: "다음 중 '과일'이 아닌 것은?", 
      options: [
        { label: '사과', emoji: '🍎', isOdd: false },
        { label: '배추', emoji: '🥬', isOdd: true },
        { label: '포도', emoji: '🍇', isOdd: false },
        { label: '수박', emoji: '🍉', isOdd: false }
      ]
    },
    { 
      question: "다음 중 '가족'이 아닌 사람은?", 
      options: [
        { label: '할아버지', emoji: '👴', isOdd: false },
        { label: '할머니', emoji: '👵', isOdd: false },
        { label: '손자', emoji: '👦', isOdd: false },
        { label: '경찰관', emoji: '👮', isOdd: true }
      ]
    },
    { 
      question: "다음 중 '탈 것'이 아닌 것은?", 
      options: [
        { label: '기차', emoji: '🚂', isOdd: false },
        { label: '나무', emoji: '🌳', isOdd: true },
        { label: '버스', emoji: '🚌', isOdd: false },
        { label: '비행기', emoji: '✈️', isOdd: false }
      ]
    },
    { 
      question: "다음 중 '주방'에 없는 것은?", 
      options: [
        { label: '냄비', emoji: '🥘', isOdd: false },
        { label: '수저', emoji: '🥄', isOdd: false },
        { label: '베개', emoji: '🛌', isOdd: true },
        { label: '국자', emoji: '🥣', isOdd: false }
      ]
    },
    { 
      question: "다음 중 '꽃'이 아닌 것은?", 
      options: [
        { label: '장미', emoji: '🌹', isOdd: false },
        { label: '나비', emoji: '🦋', isOdd: true },
        { label: '튤립', emoji: '🌷', isOdd: false },
        { label: '해바라기', emoji: '🌻', isOdd: false }
      ]
    }
  ];

  // --- [수정] 정답 확인 로직 (1초 대기 추가) ---
  const handleChoice = (isOdd, index) => {
    if (feedback) return; // 이미 피드백 중이면 클릭 무시

    setSelectedIndex(index);
    if (isOdd) {
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    // 1초 동안 정답/오답을 보여준 뒤 다음으로 이동
    setTimeout(() => {
      setFeedback(null);
      setSelectedIndex(null);
      if (currentIdx + 1 < quizData.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setGameState('RESULT');
      }
    }, 1000);
  };

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#F0FDF4', fontFamily: '"Pretendard", sans-serif',
      display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box',
      position: 'relative'
    },
    title: { fontSize: '32px', fontWeight: '900', textAlign: 'center', marginTop: '40px', color: '#166534' },
    questionBox: {
      backgroundColor: '#FFF', borderRadius: '30px', padding: '25px 20px',
      boxShadow: '0 8px 15px rgba(0,0,0,0.05)', textAlign: 'center', margin: '15px 0'
    },
    questionText: { fontSize: '26px', fontWeight: '800', color: '#374151', lineHeight: '1.4' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%' },
    
    // --- [수정] 버튼 스타일: 피드백 상태에 따라 배경색 변경 ---
    optionBtn: (isChosen, type) => ({
      height: '150px',
      backgroundColor: isChosen 
        ? (type === 'correct' ? '#DCFCE7' : '#FEE2E2') 
        : '#FFFFFF',
      borderRadius: '25px',
      border: isChosen 
        ? `4px solid ${type === 'correct' ? '#22C55E' : '#EF4444'}` 
        : '3px solid #DCFCE7',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      boxShadow: isChosen ? 'none' : '0 6px 0 #DCFCE7',
      transition: 'all 0.2s',
      gap: '5px',
      position: 'relative'
    }),
    emojiLarge: { fontSize: '60px', lineHeight: '1', marginBottom: '2px' },
    labelSmall: { fontSize: '22px', fontWeight: '800', color: '#4B5563' },

    // --- [추가] 정답/오답 큰 아이콘 ---
    markOverlay: (type) => ({
      position: 'absolute',
      fontSize: '100px',
      fontWeight: '900',
      color: type === 'correct' ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)',
      pointerEvents: 'none'
    }),

    centerBtn: {
      width: '230px', padding: '16px', backgroundColor: '#166534', color: 'white',
      borderRadius: '50px', border: 'none', fontSize: '22px', fontWeight: '900', marginTop: '30px'
    },
    backButtonPos: { position: 'absolute', bottom: '40px', left: '20px' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>쏙쏙! 다른 것 찾기 🔍</h1>

      {gameState === 'START' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
          <div style={{ fontSize: '100px' }}>🧐</div>
          <p style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', margin: '30px 0' }}>
            네 가지 그림 중에서<br/>혼자 다른 하나를 찾으세요!
          </p>
          <button style={{ ...styles.centerBtn, backgroundColor: '#22C55E' }} onClick={() => setGameState('PLAY')}>
            시작하기 🚀
          </button>
        </div>
      )}

      {gameState === 'PLAY' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '20px', color: '#166534', fontWeight: '700' }}>문제 {currentIdx + 1} / 5</p>
          <div style={styles.questionBox}>
            <span style={styles.questionText}>{quizData[currentIdx].question}</span>
          </div>

          <div style={styles.grid}>
            {quizData[currentIdx].options.map((opt, i) => {
              const isChosen = selectedIndex === i;
              return (
                <button 
                  key={i} 
                  style={styles.optionBtn(isChosen, feedback)} 
                  onClick={() => handleChoice(opt.isOdd, i)}
                >
                  <span style={styles.emojiLarge}>{opt.emoji}</span>
                  <span style={styles.labelSmall}>{opt.label}</span>
                  
                  {/* 정답/오답 표시 (선택된 버튼 위에만 나타남) */}
                  {isChosen && feedback === 'correct' && <div style={styles.markOverlay('correct')}>O</div>}
                  {isChosen && feedback === 'wrong' && <div style={styles.markOverlay('wrong')}>X</div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === 'RESULT' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
          <div style={{ fontSize: '100px' }}>🎊</div>
          <h2 style={{ fontSize: '40px', fontWeight: '950', color: '#166534' }}>참 잘하셨어요!</h2>
          <p style={{ fontSize: '24px', textAlign: 'center', margin: '20px 0' }}>
            5문제 중에서<br/><strong>{score}문제</strong>를 맞췄습니다!
          </p>
          <button 
            style={{ ...styles.centerBtn, backgroundColor: '#22C55E' }} 
            onClick={() => { setGameState('START'); setCurrentIdx(0); setScore(0); }}
          >
            한 번 더 하기 🔄
          </button>
        </div>
      )}

      <div style={styles.backButtonPos}>
        <BackButton onClick={() => navigate('/game-select')} />
      </div>
    </div>
  );
};

export default OddOneOut;