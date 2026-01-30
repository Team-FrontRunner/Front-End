import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/backButton';

const Gilchatgi = () => {
  const navigate = useNavigate();
  const [showGuides, setShowGuides] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false); // 최종 팝업 상태 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuides(true);
    }, 1000);
    return () => clearTimeout(timer);
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
      backgroundImage: 'url(/MapIMG/chat.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0, left: 0,
      zIndex: 1,
    },
    guideBubble: {
      position: 'absolute',
      backgroundColor: '#84CC16',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '30px',
      fontSize: '16px',
      fontWeight: '700',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      zIndex: 20,
      bottom: '85px',
      right: '20px',
      // 최종 모달이 뜨면 기존 가이드는 사라짐
      opacity: (showGuides && !showFinalModal) ? 1 : 0,
      transform: (showGuides && !showFinalModal) ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease-out',
      pointerEvents: 'none',
    },
    arrow: {
      position: 'absolute',
      width: 0, height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '15px solid #84CC16',
      bottom: '-12px',
      right: '50px',
    },
    startNavButton: {
      position: 'absolute',
      bottom: '18px',
      right: '15px',
      width: '155px',
      height: '52px',
      backgroundColor: 'transparent',
      borderRadius: '30px',
      border: 'none',
      cursor: 'pointer',
      zIndex: 10,
      outline: 'none',
    },
    // --- 최종 안내 팝업 스타일 ---
    modalOverlay: {
      position: 'absolute',
      top: 0, left: 0,
      width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)', // 배경 어둡게
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      opacity: showFinalModal ? 1 : 0,
      pointerEvents: showFinalModal ? 'auto' : 'none',
      transition: 'opacity 0.3s ease',
    },
    modalBox: {
      width: '280px',
      backgroundColor: '#84CC16', // 초록색 배경
      borderRadius: '30px',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    },
    naverLogoBox: {
      width: '140px',
      height: '140px',
      backgroundColor: '#FFFFFF',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '80px',
      fontWeight: '900',
      color: '#84CC16', // 로고의 'N' 색상
    }
  };

  const handleStartNav = () => {
    setShowFinalModal(true); // 팝업 띄우기
  };

  const openNaverMap = () => {
    window.location.href = "https://map.naver.com/p/directions/"; // 실제 네이버 지도로 연결
  };

  return (
    <div style={styles.container}>
      <div style={styles.background} />

      {/* 상단 뒤로가기 클릭 영역 */}
      <button 
        style={{ position: 'absolute', top: '50px', left: '15px', width: '50px', height: '50px', backgroundColor: 'transparent', border: 'none', zIndex: 10 }} 
        onClick={() => navigate(-1)} 
      />

      {/* [안내시작] 버튼 */}
      <button 
        style={styles.startNavButton} 
        onClick={handleStartNav}
        onMouseDown={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseUp={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      />

      {/* 기존 가이드 말풍선 */}
      <div style={styles.guideBubble}>
        <div style={styles.arrow} />
        눌러서 경로를 안내 받을 수 있어요!
      </div>

      {/* --- 최종 "직접 활용해보세요!" 팝업 --- */}
      <div style={styles.modalOverlay}>
        <div style={styles.modalBox}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            직접 활용해보세요!
          </div>
          <div style={styles.naverLogoBox}>N</div>
          <button 
            onClick={openNaverMap}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            네이버 지도 열기
          </button>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', left: '20px', zIndex: 30 }}>
        <BackButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default Gilchatgi;