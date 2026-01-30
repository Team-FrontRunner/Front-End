import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/backButton';

const FirstT = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: 홈, 1: 검색, 2: 도착지, 3: 출발지, 4: 택시선택, 5: 최종완료

  const styles = {
    container: {
      width: '390px', height: '844px', margin: '0 auto',
      backgroundColor: '#000', fontFamily: '"Pretendard", sans-serif',
      position: 'relative', overflow: 'hidden'
    },
    bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
    msgBox: {
      position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#FEE500', padding: '15px 20px', borderRadius: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)', zIndex: 50, width: '300px',
      color: '#3C1E1E', fontWeight: '900', fontSize: '18px',
      border: '3px solid #FFFFFF', textAlign: 'center', whiteSpace: 'pre-line'
    },
    arrow: {
      position: 'absolute', fontSize: '45px', zIndex: 45,
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      animation: 'bounce 0.8s infinite alternate'
    },
    hotspot: {
      position: 'absolute', cursor: 'pointer', zIndex: 40,
      backgroundColor: 'rgba(254, 229, 0, 0.4)', borderRadius: '12px',
      border: '3px solid #FEE500', animation: 'pulse 1.5s infinite'
    },
    finalPopup: {
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '320px', backgroundColor: '#FEE500', borderRadius: '30px',
      padding: '40px 20px', textAlign: 'center', zIndex: 100,
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '4px solid #FFFFFF'
    },
    finalLogo: {
      width: '120px', height: '120px', backgroundColor: '#FFFFFF',
      borderRadius: '30px', display: 'flex', alignItems: 'center',
      justifyContent: 'center', margin: '0 auto 25px', fontSize: '60px'
    },
    finalBtn: {
      width: '100%', padding: '18px', backgroundColor: '#3C1E1E', color: '#FEE500',
      borderRadius: '20px', border: 'none', fontSize: '20px', fontWeight: '900',
      cursor: 'pointer', marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src={
          step === 0 ? "/KakaoTaxiIMG/First.jpg" : 
          step === 1 ? "/KakaoTaxiIMG/Second.jpg" : 
          step === 2 ? "/KakaoTaxiIMG/Third.jpg" :
          step === 3 ? "/KakaoTaxiIMG/Fourth.jpg" :
          "/KakaoTaxiIMG/fifth.jpg"
        } 
        alt="가이드 배경" 
        style={styles.bgImg} 
      />

      {step === 0 && (
        <>
          <div style={styles.msgBox}>어르신! 택시를 부르려면{"\n"}이 '택시' 아이콘을 누르세요.</div>
          <div style={{ ...styles.arrow, top: '225px', left: '160px' }}>⬇️</div>
          <div style={{ ...styles.hotspot, top: '280px', left: '150px', width: '85px', height: '95px' }} onClick={() => setStep(1)} />
        </>
      )}

      {step === 1 && (
        <>
          <div style={styles.msgBox}>'어디로 갈까요?'를 눌러서{"\n"}목적지를 검색해보세요.</div>
          <div style={{ ...styles.arrow, bottom: '150px', left: '180px' }}>⬇️</div>
          <div style={{ ...styles.hotspot, bottom: '70px', left: '45px', width: '300px', height: '70px' }} onClick={() => setStep(2)} />
        </>
      )}

      {step === 2 && (
        <>
          <div style={styles.msgBox}>가고 싶은 곳이 맞나요?{"\n"}아래 파란색 버튼을 눌러{"\n"}도착지로 정하세요!</div>
          <div style={{ ...styles.arrow, bottom: '130px', left: '180px' }}>⬇️</div>
          <div style={{ ...styles.hotspot, bottom: '10px', left: '20px', width: '350px', height: '80px' }} onClick={() => setStep(3)} />
        </>
      )}

      {step === 3 && (
        <>
          <div style={styles.msgBox}>택시를 탈 위치를 정해요.{"\n"}아래 '확인' 버튼을 누르세요!</div>
          <div style={{ ...styles.arrow, bottom: '130px', left: '180px' }}>⬇️</div>
          <div style={{ ...styles.hotspot, bottom: '10px', left: '20px', width: '350px', height: '80px' }} onClick={() => setStep(4)} />
        </>
      )}

      {step === 4 && (
        <>
          <div style={styles.msgBox}>
            이제 원하는 택시를 골라요.{"\n"}가장 많이 쓰는 '일반호출'의{"\n"}가격을 확인하고 누르세요!
          </div>
          <div style={{ ...styles.arrow, top: '450px', left: '180px' }}>⬇️</div>
          <div 
            style={{ ...styles.hotspot, top: '500px', left: '20px', width: '350px', height: '90px' }} 
            onClick={() => setStep(5)} 
          />
        </>
      )}

      {step === 5 && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 90 }}>
          <div style={styles.finalPopup}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', marginBottom: '20px' }}>직접 활용해보세요!</div>
            <div style={styles.finalLogo}>🚕</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#3C1E1E', lineHeight: '1.4' }}>
              학습을 완료했습니다!{"\n"}실제 카카오 택시를 열어{"\n"}안전하게 이동해볼까요?
            </div>
            <button 
              style={styles.finalBtn}
              onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.kakao.taxi'}
            >
              카카오 택시 열기
            </button>
            {/* [수정] navigate 대신 setStep(0)을 사용하여 첫 화면으로 초기화 */}
            <button 
              style={{ background: 'none', border: 'none', color: '#8B6A00', marginTop: '15px', textDecoration: 'underline', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => setStep(0)}
            >
              한 번 더 연습하기
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 60 }}>
        <BackButton onClick={() => navigate('/training')} />
      </div>

      <style>
        {`
          @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }
          @keyframes pulse { 0% { opacity: 0.3; } 50% { opacity: 0.6; } 100% { opacity: 0.3; } }
        `}
      </style>
    </div>
  );
};

export default FirstT;