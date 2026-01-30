import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';
import brainIcon from '../assets/icons/brain2.png';

const BrainMissionApp = () => {
  const navigate = useNavigate();
  
  // 데이터 배열
  const missions = [
    { id: 1, title: '카드 맞추기', icon: '🎴' },
    { id: 2, title: '시 읽기', icon: '📖' },
    { id: 3, title: '다른 것 찾기', icon: '🔍' },
    { id: 4, title: '산수 연습', icon: '🔢' },
    { id: 5, title: '기억의 길', icon: '👣' },
    { id: 6, title: '퍼즐 맞추기', icon: '🧩' },
  ];

  // 인라인 스타일 객체
  const styles = {
    container: {
      width: '390px',
      height: '844px',
      backgroundColor: '#FDFBEE',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Pretendard", sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden',
      border: '1px solid #eee'
    },
    header: {
      padding: '40px 20px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
    },
    headerIcon: {
      width: '60px',
      height: '60px',
      backgroundColor: '#7FD821',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    headerIconImage: {
      width: '60px',
      height: '60px',
      objectFit: 'contain',
    },
    headerTitle: {
      margin: 0,
      fontSize: '35px',
      fontWeight: '700',
      color: '#194018',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      padding: '20px',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      padding: '25px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      border: '1px solid #EAEAEA',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    iconBox: {
      width: '60px',
      height: '60px',
      backgroundColor: '#F7FEE7',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
    },
    cardText: {
      fontSize: '25px',
      fontWeight: '700',
      color: '#444',
    },
    footer: {
      marginTop: 'auto',
      padding: '40px 30px',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    // 이미지 기반 커스텀 버튼 스타일
    customButton: {
      backgroundColor: '#84CC16',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '50px',
      padding: '12px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 4px 0 #65A30D',
      transition: 'transform 0.1s ease',
    }
  };

  return (
    <div style={styles.container}>
      {/* 상단 제목 영역 */}
      <header style={styles.header}>
        <div style={styles.headerIcon}>
          <img src={brainIcon} alt="brain" style={styles.headerIconImage} />
        </div>
        <h1 style={styles.headerTitle}>일일 두뇌 미션</h1>
      </header>

      {/* 미션 카드 그리드 */}
      <main style={styles.grid}>
        {missions.map((m) => (
          <div 
            key={m.id} 
            style={styles.card}
            onClick={() => {
              // '카드 맞추기' 클릭 시 이동 로직
              if (m.id === 1) {
                navigate('/card-game'); 
              } 
              
              else if (m.id === 2) {
                navigate('/poetry');
              }

               else if (m.id === 3) {
                navigate('/odd-one-out');
              } 

              else if (m.id === 4) {
                navigate('/math-game');
              } 

              else if (m.id === 5) {
                navigate('/brain-game');
              }
             
              else if (m.id === 6) {
                navigate('/');
              }
              
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#84CC16';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#EAEAEA';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.iconBox}>{m.icon}</div>
            <span style={styles.cardText}>{m.title}</span>
          </div>
        ))}
      </main>

      {/* 하단 돌아가기 버튼 */}
      <footer style={styles.footer}>
        <BackButton onClick={() => navigate('/')} />
      </footer>
    </div>
  );
};

export default BrainMissionApp;