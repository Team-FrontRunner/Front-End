import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/backButton';

const MapEducation = () => {
  const navigate = useNavigate();
  const [showGuides, setShowGuides] = useState(false);
  const [showPointGuide, setShowPointGuide] = useState(false); // 강조 메시지 상태 추가

  useEffect(() => {
    // 1.1초 뒤에 첫 번째 가이드 메시지들 표시
    const timer1 = setTimeout(() => {
      setShowGuides(true);
    }, 1100);

    // 첫 메시지 표시 1초 후(총 2.1초)에 "여기를 눌러보세요" 표시
    const timer2 = setTimeout(() => {
      setShowPointGuide(true);
    }, 2100);

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
    mapBackground: {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/MapIMG/FirstMap.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0, left: 0,
      zIndex: 1,
    },
    pathButton: {
      position: 'absolute',
      top: '35px',
      right: '10px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      zIndex: 100,
      border: 'none',
      outline: 'none',
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
      transition: 'all 0.5s ease-out',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    },
    // 강조용 노란색/연두색 말풍선 스타일 (선택 사항: 색상을 다르게 하여 강조 가능)
    pointBubble: {
      position: 'absolute',
      backgroundColor: '#FACC15', // 강조를 위해 노란색 계열 사용 (원하시면 #84CC16 유지 가능)
      color: '#1A2E05',
      padding: '12px 25px',
      borderRadius: '30px',
      fontSize: '18px',
      fontWeight: '900',
      boxShadow: '0 0 15px rgba(250, 204, 21, 0.6)',
      zIndex: 25,
      transition: 'all 0.4s ease-in-out',
      whiteSpace: 'nowrap',
      border: '2px solid #FFFFFF'
    },
    arrow: {
      position: 'absolute',
      width: 0, height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '12px solid #84CC16',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mapBackground} />

      {/* 2. 길찾기 버튼 */}
      <button 
        style={styles.pathButton} 
        onClick={() => navigate('/gilchatgi')}
        onMouseDown={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseUp={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)'}
      />

      {/* 3. 가이드 말풍선들 */}
      
      {/* [신규] 여기를 눌러보세요 강조 메시지 (기존 메시지 자리에 등장) */}
      <div style={{ 
        ...styles.pointBubble, 
        top: '105px', 
        right: '15px',
        opacity: showPointGuide ? 1 : 0,
        transform: showPointGuide ? 'scale(1)' : 'scale(0.8)',
      }}>
        <div style={{ 
          ...styles.arrow, 
          top: '-11px', 
          right: '25px', 
          borderBottomColor: '#FACC15' 
        }} />   
        여기를 눌러보세요!!
      </div>

      {/* [수정] 기존 경로 안내 메시지: 강조 메시지가 뜨면 아래로 이동 */}
      <div style={{ 
        ...styles.guideBubble, 
        top: showPointGuide ? '175px' : '105px', // 강조 메시지 등장 시 아래로 밀려남
        right: '15px',
        opacity: showGuides ? 1 : 0,
        zIndex: showPointGuide ? 19 : 20 // 강조 메시지보다 뒤로 가도록 설정
      }}>
        출발지~목적지 까지의 경로를 볼 수 있어요
      </div>

      <div style={{ ...styles.guideBubble, top: '535px', left: '50%', transform: `translateX(-50%)`, opacity: showGuides ? 1 : 0 }}>
        지금 내 위치를 보여줘요!
      </div>

      <div style={{ ...styles.guideBubble, bottom: '115px', left: '50%', transform: `translateX(-50%)`, opacity: showGuides ? 1 : 0 }}>
        <div style={{ ...styles.arrow, bottom: '-10px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' }} />
        버스 운행 정보를 볼 수 있어요!
      </div>

      <footer style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 30 }}>
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  );
};

export default MapEducation;