import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton'; 

const HospitalStudy = () => {
  const navigate = useNavigate(); // Hook은 반드시 최상단에!
  const [step, setStep] = useState(0); // 0:DF(홈), 1:DS(목록), 2:DT(상세), 3:완료

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#000', fontFamily: '"Pretendard", sans-serif',
      position: 'relative', overflow: 'hidden'
    },
    bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
    // 안내 메시지 (상단 배치)
    msgBox: {
      position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#FFFFFF', padding: '15px 20px', borderRadius: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)', zIndex: 50, width: '300px',
      color: '#333', fontWeight: '900', fontSize: '18px',
      border: '3px solid #3182F6', textAlign: 'center', whiteSpace: 'pre-line'
    },
    arrow: {
      position: 'absolute', fontSize: '45px', zIndex: 45,
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      animation: 'bounce 0.8s infinite alternate'
    },
    // 클릭 버튼 영역 (깜빡이는 파란 박스)
    hotspot: {
      position: 'absolute', cursor: 'pointer', zIndex: 40,
      backgroundColor: 'rgba(49, 130, 246, 0.3)', borderRadius: '15px',
      border: '3px solid #3182F6', animation: 'pulse 1.5s infinite'
    },
    // 완료 팝업
    finalPopup: {
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '320px', backgroundColor: '#FFFFFF', borderRadius: '30px',
      padding: '40px 20px', textAlign: 'center', zIndex: 100,
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '4px solid #3182F6'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. 배경 이미지 전환 (DF -> DS -> DT) */}
      <img 
        src={
          step === 0 ? "/DDokIMG/DF.jpg" : 
          step === 1 ? "/DDokIMG/DS.jpg" : 
          "/DDokIMG/DT.jpg"
        } 
        alt="병원 예약 가이드" 
        style={styles.bgImg} 
      />

      {/* 2. 단계별 가이드 로직 */}
      
      {/* [DF.jpg] 당일 예약 버튼 안내 */}
      {step === 0 && (
        <>
          <div style={styles.msgBox}>어르신! 병원을 예약하려면{"\n"}중앙에 있는 '당일 예약'을 누르세요.</div>
          <div style={{ ...styles.arrow, top: '450px', left: '115px' }}>⬇️</div>
          <div 
            style={{ ...styles.hotspot, top: '500px', left: '100px', width: '90px', height: '100px' }} 
            onClick={() => setStep(1)} 
          />
        </>
      )}

      {/* [DS.jpg] 병원 목록에서 선택 안내 */}
      {step === 1 && (
        <>
          <div style={styles.msgBox}>가까운 병원들이 나왔네요!{"\n"}'소아청소년과' 병원을 눌러보세요.</div>
          <div style={{ ...styles.arrow, top: '450px', left: '150px' }}>⬇️</div>
          <div 
            style={{ ...styles.hotspot, top: '500px', left: '10px', width: '350px', height: '150px' }} 
            onClick={() => setStep(2)} 
          />
        </>
      )}

      {/* [DT.jpg] 상세 화면에서 시간 예약 안내 */}
      {step === 2 && (
        <>
          <div style={styles.msgBox}>마지막입니다! 아래 오른쪽에 있는{"\n"}노란색 '시간예약'을 누르세요.</div>
          <div style={{ ...styles.arrow, bottom: '80px', left: '255px' }}>⬇️</div>
          <div 
            style={{ ...styles.hotspot, bottom: '10px', right: '10px', width: '180px', height: '70px' }} 
            onClick={() => setStep(3)} 
          />
        </>
      )}

      {/* 3. 최종 완료 화면 (팝업 형식) */}
      {step === 3 && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 90 }}>
          <div style={styles.finalPopup}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#3182F6', marginBottom: '20px' }}>예약 학습 완료! 🏥</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#333', lineHeight: '1.4', marginBottom: '30px' }}>
              참 잘하셨어요! 이제{"\n"}직접 병원을 예약해볼까요?
            </div>
            <button 
              style={{ width: '100%', padding: '18px', backgroundColor: '#3182F6', color: '#FFF', borderRadius: '15px', border: 'none', fontSize: '20px', fontWeight: '900', cursor: 'pointer' }}
              onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.bbros.sayup'}
            >
              똑닥 앱 열기
            </button>
            <button 
              style={{ background: 'none', border: 'none', color: '#3182F6', marginTop: '15px', textDecoration: 'underline', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => setStep(0)}
            >
              한 번 더 연습하기
            </button>
          </div>
        </div>
      )}

      {/* 공통 뒤로가기 버튼 */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 60 }}>
        <BackButton onClick={() => navigate('/training')} />
      </div>

      <style>
        {`
          @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }
          @keyframes pulse { 0% { opacity: 0.2; } 50% { opacity: 0.5; } 100% { opacity: 0.2; } }
        `}
      </style>
    </div>
  );
};

export default HospitalStudy;