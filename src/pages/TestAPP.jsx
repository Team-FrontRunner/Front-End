import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';

const AppTrainingTest = () => {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('select');
  const [selectedApp, setSelectedApp] = useState(null);
  const [step, setStep] = useState(0);

  const testData = {
    taxi: {
      name: "카카오 택시",
      steps: [
        { img: "/KakaoTaxiIMG/First.jpg", hotspot: { top: '280px', left: '150px', width: '85px', height: '95px' } },
        { img: "/KakaoTaxiIMG/Second.jpg", hotspot: { bottom: '70px', left: '45px', width: '300px', height: '70px' } },
        { img: "/KakaoTaxiIMG/Third.jpg", hotspot: { bottom: '10px', left: '20px', width: '350px', height: '80px' } },
        { img: "/KakaoTaxiIMG/Fourth.jpg", hotspot: { bottom: '10px', left: '20px', width: '350px', height: '80px' } },
        { img: "/KakaoTaxiIMG/fifth.jpg", hotspot: { top: '500px', left: '20px', width: '350px', height: '90px' } },
      ]
    },
    hospital: {
      name: "똑닥 (병원 예약)",
      steps: [
        { img: "/DDokIMG/DF.jpg", hotspot: { top: '450px', left: '115px', width: '90px', height: '100px' } }, 
        { img: "/DDokIMG/DS.jpg", hotspot: { top: '450px', left: '150px', width: '350px', height: '150px' } }, 
        { img: "/DDokIMG/DT.jpg", hotspot: { bottom: '10px', right: '10px', width: '180px', height: '70px' } }, 
      ]
    },
    map: {
      name: "네이버 지도",
      steps: [
        { img: "/MapIMG/FirstMap.jpg", hotspot: { top: '37px', left: '320px', width: '60px', height: '60px' } }, 
        { img: "/MapIMG/gil.jpg", hotspot: { top: '450px', left: '10px', width: '370px', height: '300px' } },      
        { img: "/MapIMG/chat.jpg", hotspot: { bottom: '10px', right: '15px', width: '100px', height: '40px' } },  
      ]
    }
  };

  const startTest = (appKey) => {
    if (testData[appKey]) {
      setSelectedApp(testData[appKey]);
      setStep(0);
      setMode('testing');
    }
  };

  const handleNext = () => {
    if (step < selectedApp.steps.length - 1) {
      setStep(step + 1);
    } else {
      setMode('finish');
    }
  };

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#F3F4F6', fontFamily: '"Pretendard", sans-serif',
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
      padding: '70px 20px 30px', backgroundColor: '#374151', color: 'white',
      textAlign: 'center', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px'
    },
    selectArea: {
      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', 
      gap: '20px', padding: '10px 30px'
    },
    guideNote: {
      textAlign: 'center', fontSize: '18px', fontWeight: '700', color: '#4B5563',
      backgroundColor: '#F9FAFB', padding: '15px', borderRadius: '20px',
      border: '2px dashed #D1D5DB', marginBottom: '15px', marginTop: '15px', lineHeight: '1.5'
    },
    appBtn: {
      padding: '30px 25px', borderRadius: '30px', border: 'none', backgroundColor: 'white',
      color: '#374151', fontSize: '26px', fontWeight: '900', 
      boxShadow: '0 10px 0 #D1D5DB', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    testImg: { width: '100%', height: '100%', objectFit: 'cover' },
    
   
    hotspot: (pos) => ({
      position: 'absolute', 
      ...pos, 
      cursor: 'pointer', 
      zIndex: 100,
      backgroundColor: 'transparent',
      border: 'none',
      boxSizing: 'border-box'
    }),

    finishOverlay: {
      position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: '30px', textAlign: 'center'
    },
    bigBtn: {
      width: '100%', padding: '22px', borderRadius: '50px', border: 'none',
      fontSize: '24px', fontWeight: '900', color: 'white', backgroundColor: '#10B981',
      boxShadow: '0 8px 0 #059669', cursor: 'pointer', marginTop: '30px'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. 과목 선택 화면 */}
      {mode === 'select' && (
        <>
          <header style={styles.header}>
            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900' }}>실전 실력 테스트 🎓</h1>
            <p style={{ opacity: 0.9, marginTop: '15px', fontSize: '20px', fontWeight: '600', lineHeight: '1.4' }}>
              도움말 없이 끝까지{"\n"}스스로 성공해보세요!
            </p>
          </header>
          
          <main style={styles.selectArea}>
            <div style={styles.guideNote}>
              💡 여태까지 배운대로<p>버튼을 누르면 성공입니다!</p>
            </div>

            <button style={styles.appBtn} onClick={() => startTest('taxi')}>
              <span>🚕 카카오 택시</span> <span style={{ color: '#9CA3AF' }}>➡️</span>
            </button>
            <button style={styles.appBtn} onClick={() => startTest('hospital')}>
              <span>🏥 똑닥 (병원)</span> <span style={{ color: '#9CA3AF' }}>➡️</span>
            </button>
            <button style={styles.appBtn} onClick={() => startTest('map')}>
              <span>🗺️ 네이버 지도</span> <span style={{ color: '#9CA3AF' }}>➡️</span>
            </button>
          </main>
        </>
      )}

      {/* 2. 시험 진행 모드 */}
      {mode === 'testing' && selectedApp && (
        <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
          <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 150, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px 20px', borderRadius: '30px', fontSize: '18px', fontWeight: '700' }}>
            {selectedApp.name} ({step + 1} / {selectedApp.steps.length})
          </div>
          <img src={selectedApp.steps[step].img} alt="시험 화면" style={styles.testImg} />
          <div style={styles.hotspot(selectedApp.steps[step].hotspot)} onClick={handleNext} />
        </div>
      )}

      {/* 3. 합격 결과 화면 */}
      {mode === 'finish' && (
        <div style={styles.finishOverlay}>
          <div style={{ fontSize: '120px', marginBottom: '20px' }}>🏅</div>
          <h2 style={{ fontSize: '40px', fontWeight: '950', color: '#065F46', marginBottom: '10px' }}>백점 만점!</h2>
          <p style={{ fontSize: '22px', fontWeight: '700', color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {selectedApp.name} 사용법을{"\n"}완벽하게 기억하고 계시네요!
          </p>
          <button style={styles.bigBtn} onClick={() => setMode('select')}>다른 과목 시험보기</button>
          <button style={{ ...styles.bigBtn, backgroundColor: '#374151', boxShadow: '0 8px 0 #111827' }} onClick={() => navigate('/test-app')}>메뉴로 돌아가기</button>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: '30px', left: '20px', zIndex: 150 }}>
        <BackButton onClick={mode === 'testing' ? () => setMode('select') : () => navigate('/training')} />
      </div>
    </div>
  );
};

export default AppTrainingTest;