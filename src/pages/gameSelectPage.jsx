import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrainMissionApp = () => {
  const navigate = useNavigate();
  
  // 데이터 배열
  const missions = [
    { id: 1, title: '카드 맞추기', icon: '🎴' },
    { id: 2, title: '시 짓기', icon: '✍️' },
    { id: 3, title: '십자말 풀이', icon: '🐴' },
    { id: 4, title: '산수 연습', icon: '🔢' },
    { id: 5, title: '기억력 게임', icon: '🧠' },
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
      padding: '50px 20px 40px 20px',
      display: 'flex',
      justifyContent: 'center',
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
      fontSize: '16px',
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
        <div style={{
          backgroundColor: '#1A2E05',
          padding: '12px 35px',
          borderRadius: '12px',
          boxShadow: '0 4px 0 #84CC16',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ width: '4px', height: '16px', backgroundColor: '#84CC16', borderRadius: '2px' }} />
          <h1 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '900',
            color: '#FFFFFF',
            letterSpacing: '3px',
          }}>
            일일 두뇌 미션
          </h1>
          <div style={{ width: '4px', height: '16px', backgroundColor: '#84CC16', borderRadius: '2px' }} />
        </div>
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
              } else {
                alert(`${m.title} 서비스는 준비 중입니다.`);
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

      {/* 하단 돌아가기 버튼 (이미지 디자인 적용) */}
      <footer style={styles.footer}>
        <button 
          onClick={() => navigate('/')}
          style={styles.customButton}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 2px 0 #65A30D';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 0 #65A30D';
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: '900' }}>〈</span>
          돌아가기
        </button>
      </footer>
    </div>
  );
};

export default BrainMissionApp;