import React from 'react';

const BrainMissionApp = () => {
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
      backgroundColor: '#FFFFFF',
      margin: '0 auto', // 중앙 정렬
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Pretendard", sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden',
      border: '1px solid #eee' // 실제 영역 확인용 아주 연한 선
    },
    header: {
      padding: '60px 20px 30px 20px',
      display: 'flex',
      justifyContent: 'center',
    },
    titleBadge: {
      backgroundColor: '#F0F0F0',
      padding: '10px 30px',
      borderRadius: '8px',
    },
    title: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      letterSpacing: '2px',
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
    },
    iconBox: {
      width: '60px',
      height: '60px',
      backgroundColor: '#F7FEE7', // 매우 연한 연두색 배경
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
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      fontWeight: '800',
      color: '#333',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    pointColor: {
      color: '#84CC16' // 포인트 연두색
    }
  };

  return (
    <div style={styles.container}>
      {/* 상단 제목 영역 */}
      <header style={{ ...styles.header, padding: '50px 20px 40px 20px' }}>
        <div style={{
          backgroundColor: '#1A2E05', // 어두운 배경으로 무게감 부여
          padding: '12px 35px',
          borderRadius: '12px',
          position: 'relative',
          boxShadow: '0 4px 0 #84CC16', // 하단에 연두색 두께감 추가
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {/* 장식용 바 */}
          <div style={{ width: '4px', height: '16px', backgroundColor: '#84CC16', borderRadius: '2px' }} />
          
          <h1 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '900',
            color: '#FFFFFF', // 글자는 흰색으로 대비
            letterSpacing: '3px',
            textShadow: '1px 1px 0 rgba(0,0,0,0.2)'
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

      {/* 하단 돌아가기 */}
      <footer style={styles.footer}>
        <button 
          style={styles.backButton}
          onMouseEnter={(e) => e.currentTarget.style.color = '#84CC16'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
        >
          <span style={{ fontSize: '24px' }}>⬅</span> 돌아가기
        </button>
      </footer>
    </div>
  );
};

export default BrainMissionApp;