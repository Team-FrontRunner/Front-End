import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton'; 

const MathGame = () => {
  const navigate = useNavigate();
  
  const [gameState, setGameState] = useState('START');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null); 
  const [selectedIdx, setSelectedIdx] = useState(null);

  const totalQuestions = 5;

  const generateQuestion = useCallback(() => {
    const operators = ['+', '-', '×'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1, n2, ans;

    if (op === '+') {
      n1 = Math.floor(Math.random() * 20) + 1; n2 = Math.floor(Math.random() * 20) + 1; ans = n1 + n2;
    } else if (op === '-') {
      n1 = Math.floor(Math.random() * 20) + 10; n2 = Math.floor(Math.random() * n1) + 1; ans = n1 - n2;
    } else {
      n1 = Math.floor(Math.random() * 9) + 2; n2 = Math.floor(Math.random() * 9) + 1; ans = n1 * n2;
    }

    let options = [ans];
    while (options.length < 3) {
      const wrong = ans + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      if (wrong > 0 && !options.includes(wrong)) options.push(wrong);
    }
    
    setQuestion({
      text: `${n1} ${op} ${n2} = ?`,
      answer: ans,
      options: options.sort(() => Math.random() - 0.5)
    });
    setTimeLeft(15); setFeedback(null); setSelectedIdx(null);
  }, []);

  const startGame = () => {
    setScore(0); setCurrentIdx(0); setGameState('PLAYING'); generateQuestion();
  };

  useEffect(() => {
    let timer;
    if (gameState === 'PLAYING' && !feedback && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !feedback) {
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, feedback]);

  const handleAnswer = (choice, idx) => {
    if (feedback) return; 
    setSelectedIdx(idx);
    if (choice === question.answer) {
      setFeedback('correct'); setScore(prev => prev + 1);
    } else {
      setFeedback(choice === null ? 'timeout' : 'wrong');
    }
    setTimeout(() => {
      if (currentIdx + 1 < totalQuestions) {
        setCurrentIdx(prev => prev + 1); generateQuestion();
      } else {
        setGameState('RESULT');
      }
    }, 2000);
  };

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#F8FAF3', fontFamily: '"Pretendard", sans-serif',
      position: 'relative', display: 'flex', flexDirection: 'column',
      padding: '20px', boxSizing: 'border-box',
    },
    header: { textAlign: 'center', marginTop: '30px' },
    timer: {
      fontSize: '26px', fontWeight: '900', color: timeLeft <= 5 ? '#EF4444' : '#111827',
      margin: '15px 0', textAlign: 'center'
    },
    questionBox: {
      backgroundColor: '#FFF', borderRadius: '30px', padding: '30px 20px',
      boxShadow: '0 8px 15px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '20px'
    },
    feedbackMsg: (type) => ({
      textAlign: 'center', minHeight: '40px', marginBottom: '15px',
      fontSize: '24px', fontWeight: '900',
      color: type === 'correct' ? '#16A34A' : '#EF4444',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }),
    optionBtn: (idx, isCorrect, isWrong) => ({
      width: '100%', 
      height: '110px', 
      marginBottom: '18px', 
      borderRadius: '30px',
      fontSize: '50px',
      fontWeight: '950', 
      cursor: 'pointer',
      backgroundColor: isCorrect ? '#DCF17D' : isWrong ? '#FEE2E2' : '#FFFFFF',
      border: isCorrect ? '6px solid #84CC16' : isWrong ? '6px solid #EF4444' : '3px solid #E5E7EB',
      color: '#111827', 
      boxShadow: '0 8px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.1s', 
      outline: 'none', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center'
    }),
    backButtonWrapper: {
      position: 'absolute', bottom: '40px', left: '20px', pointerEvents: 'none'
    }
  };

  return (
    <div style={styles.container}>
      {gameState === 'START' && (
        <div style={{ textAlign: 'center', marginTop: '130px' }}>
          <span style={{ fontSize: '100px' }}>🧮</span>
          <h1 style={{ fontSize: '36px', fontWeight: '900', margin: '30px 0' }}>반짝반짝 산수 교실</h1>
          <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '40px' }}>5문제를 모두 맞춰보세요!</p>
          <button onClick={startGame} style={{ width: '280px', padding: '25px', backgroundColor: '#84CC16', color: 'white', borderRadius: '60px', border: 'none', fontSize: '28px', fontWeight: '900', boxShadow: '0 8px 0 #65A30D' }}>
            시작하기 🚀
          </button>
        </div>
      )}

      {gameState === 'PLAYING' && question && (
        <>
          <div style={styles.header}>
            <span style={{ color: '#84CC16', fontWeight: '900', fontSize: '22px' }}>{currentIdx + 1} / {totalQuestions} 단계</span>
          </div>
          <div style={styles.timer}>⏰ {timeLeft}초 남았어요</div>
          
          <div style={styles.questionBox}>
            <h2 style={{ fontSize: '56px', fontWeight: '900', margin: 0 }}>{question.text}</h2>
          </div>

          <div style={styles.feedbackMsg(feedback)}>
            {feedback === 'correct' ? '정답입니다! 잘하셨어요!' : 
             feedback === 'timeout' ? '시간이 다 됐어요! ⏰' : 
             feedback === 'wrong' ? `틀렸어요! 정답은 ${question.answer}` : ''}
          </div>

          <div style={{ padding: '0 10px' }}>
            {question.options.map((opt, idx) => (
              <button 
                key={idx}
                style={styles.optionBtn(idx, (feedback && opt === question.answer), (feedback && selectedIdx === idx && opt !== question.answer))}
                onClick={() => handleAnswer(opt, idx)}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {gameState === 'RESULT' && (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '40px' }}>게임 끝!</h1>
          <div style={{ backgroundColor: '#FFF', padding: '40px 20px', borderRadius: '40px', marginBottom: '50px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '22px', color: '#6B7280', marginBottom: '10px' }}>내 점수</p>
            <h2 style={{ fontSize: '64px', fontWeight: '900', color: '#84CC16' }}>{score * 20}점</h2>
            <p style={{ fontSize: '18px', color: '#9CA3AF' }}>{totalQuestions}문제 중 {score}문제 정답!</p>
          </div>
          <button onClick={startGame} style={{ width: '280px', padding: '22px', backgroundColor: '#374151', color: 'white', borderRadius: '50px', border: 'none', fontSize: '24px', fontWeight: '900' }}>
            다시 하기 🔄
          </button>
        </div>
      )}

      <div style={styles.backButtonWrapper}>
        <div style={{ pointerEvents: 'auto' }}>
          <BackButton onClick={() => navigate('/game-select')} />
        </div>
      </div>
    </div>
  );
};

export default MathGame;