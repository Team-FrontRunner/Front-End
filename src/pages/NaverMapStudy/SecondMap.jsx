import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPathDetail = () => {
  const navigate = useNavigate();
  const [showGuides, setShowGuides] = useState(false);
  const [showPointGuide, setShowPointGuide] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowGuides(true), 1000);
    const timer2 = setTimeout(() => setShowPointGuide(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      margin: '0 auto',
      position: 'relative',
      fontFamily: '"Pretendard", sans-serif',
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
      border: '1px solid #eee'
    },
    background: {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/MapIMG/gil.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0, left: 0,
      zIndex: 1,
    },
    // [확장 수정] "최적" 라벨 위쪽 라인부터 버튼이 시작되도록 좌표 조정
    routeBoxButton: {
      position: 'absolute',
      top: '445px',      // 490px에서 445px로 위로 올려서 "최적" 글자 위부터 클릭 가능
      left: '10px',
      width: '370px',    
      height: '285px',   // 위로 올린 만큼 전체 높이를 285px로 확장 (안내시작 버튼 바로 위까지)
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 100,       
      borderRadius: '12px',
      outline: 'none',
    },
    guideBubble: {
      position: 'absolute',
      backgroundColor: '#84CC16',
      color: 'white',
      padding: '12px 18px',
      borderRadius: '30px',
      fontSize: '15px',
      fontWeight: '700',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      zIndex: 20,
      opacity: showGuides ? 1 : 0,
      transform: showGuides ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease-out',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    },
    pointBubble: {
      position: 'absolute',
      backgroundColor: '#FACC15',
      color: '#1A2E05',
      padding: '12px 25px',
      borderRadius: '30px',
      fontSize: '17px',
      fontWeight: '900',
      boxShadow: '0 0 15px rgba(250, 204, 21, 0.6)',
      zIndex: 25,
      transition: 'all 0.4s ease-in-out',
      whiteSpace: 'nowrap',
      border: '2px solid #FFFFFF',
      opacity: showPointGuide ? 1 : 0,
      transform: showPointGuide ? 'scale(1)' : 'scale(0.8)',
      pointerEvents: 'none',
    },
    arrowBase: {
      position: 'absolute',
      width: 0, height: 0,
      borderLeft: '9px solid transparent',
      borderRight: '9px solid transparent',
    },
    backBtn: {
      position: 'absolute',
      bottom: '30px',
      left: '30px',
      zIndex: 30,
      backgroundColor: '#84CC16',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '50px',
      padding: '12px 25px',
      fontSize: '18px',
      fontWeight: 'bold',
      boxShadow: '0 4px 0 #65A30D',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background} />

      {/* 2. "최적" 라인부터 확장된 경로 정보 박스 버튼 */}
      <button 
        style={styles.routeBoxButton}
        onClick={() => navigate('/jido')}
        onMouseDown={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        onMouseUp={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      />

      {/* 3. 강조 메시지: 확장된 버튼의 최상단 위치를 가리킴 */}
      <div style={{ ...styles.pointBubble, top: '385px', left: '50%', transform: `translateX(-50%) ${showPointGuide ? 'scale(1)' : 'scale(0.8)'}` }}>
        <div style={{ ...styles.arrowBase, bottom: '-11px', left: '50%', transform: 'translateX(-50%)', borderTop: '12px solid #FACC15' }} />
        여기를 눌러보세요!!
      </div>

      {/* 4. 기본 가이드 메시지들 */}
      <div style={{ ...styles.guideBubble, top: '140px', left: '50%', transform: `translateX(-50%) ${showGuides ? 'translateY(0)' : 'translateY(10px)'}` }}>
        <div style={{ ...styles.arrowBase, top: '-11px', left: '30px', borderBottom: '12px solid #84CC16' }} />
        출발지(윗 칸)과 목적지(아래칸)을 입력해주세요!
      </div>

      <div style={{ ...styles.guideBubble, top: '320px', left: '45px' }}>
        <div style={{ ...styles.arrowBase, top: '-11px', left: '20px', borderBottom: '12px solid #84CC16' }} />
        최적의 버스 환승 경로를 확인할 수 있어요
      </div>

      <div style={{ ...styles.guideBubble, top: '650px', right: '20px' }}>
        <div style={{ ...styles.arrowBase, top: '-11px', right: '30px', borderBottom: '12px solid #84CC16' }} />
        다음 버스 도착까지 남은 시간을 알 수 있어요!
      </div>

      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        <span style={{ fontSize: '20px', fontWeight: '900' }}>〈</span> 돌아가기
      </button>
    </div>
  );
};

export default MapPathDetail;