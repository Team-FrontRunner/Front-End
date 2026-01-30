import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton'; 

const AppSelection = () => {
  const navigate = useNavigate();

  const appsData = [
    {
      id: 'navermap',
      name: '네이버 지도',
      description: '길찾기와 버스·지하철 정보를 확인해요',
      themeColor: '#2DB400',
      shadowColor: '#248F00',
      imageUrl: '/AppIcon/네이버 지도.png',
      link: '/map'
    },
    {
      id: 'kakaotaxi',
      name: '카카오 T (택시)',
      description: '내 위치로 택시를 부르고 결제까지 해요',
      themeColor: '#FFCD00',
      shadowColor: '#D1A800',
      imageUrl: '/AppIcon/카카오 T.png',
      link: '/taxi'
    },
    {
      id: 'ttokddak',
      name: '똑닥',
      description: '병원 대기 없이 스마트폰으로 줄서기해요',
      themeColor: '#FFD400',
      shadowColor: '#D1AD00',
      imageUrl: '/AppIcon/똑닥.png',
      link: '/ttokddak-education'
    },
    {
      id: 'gov24',
      name: '정부24',
      description: '주민등록등본 등 서류를 집에서 발급해요',
      themeColor: '#0055A5',
      shadowColor: '#004484',
      imageUrl: '/AppIcon/정부24.png',
      link: '/gov24-education'
    },
    {
      id: 'doctornow',
      name: '닥터나우',
      description: '비대면 진료받고 약 배달까지 신청해요',
      themeColor: '#FF8A00',
      shadowColor: '#D17100',
      imageUrl: '/AppIcon/닥터나우.png',
      link: '/doctornow-education'
    }
  ];

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      margin: '0 auto',
      backgroundColor: '#F3F4F6',
      fontFamily: '"Pretendard", sans-serif',
      padding: '30px 20px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '35px',
      paddingTop: '20px'
    },
    title: {
      fontSize: '30px',
      fontWeight: '900',
      color: '#111827',
      lineHeight: '1.4',
      marginBottom: '10px'
    },
    cardList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      paddingBottom: '120px' 
    },
    appCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '28px',
      padding: '25px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    imageContainer: {
      width: '140px',
      height: '140px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    appIcon: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      borderRadius: '30px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    appName: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#1F2937',
      marginBottom: '8px'
    },
    appDesc: {
      fontSize: '25px',
      color: '#6B7280',
      fontWeight: '500',
      lineHeight: '1.4',
      marginBottom: '25px',
      padding: '0 10px'
    },
    startButton: {
      width: '100%',
      padding: '18px 0',
      border: 'none',
      borderRadius: '20px',
      fontSize: '25px',
      fontWeight: '900',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.1s'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>오늘 공부할 앱을<br/>골라주세요! 🎯</h1>
      </header>

      <div style={styles.cardList}>
        {appsData.map((app) => (
          <div key={app.id} style={styles.appCard}>
            <div style={styles.imageContainer}>
              <img 
                src={app.imageUrl} 
                alt={app.name} 
                style={styles.appIcon}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/140?text=Icon+Error";
                }}
              />
            </div>

            <div style={styles.appName}>{app.name}</div>
            <div style={styles.appDesc}>{app.description}</div>

            <button 
              onClick={() => {
                if (app.id === 'navermap') {
                  navigate(app.link);
                } else {
                  alert('아직 준비중인 서비스입니다.');
                }
              }}
              style={{
                ...styles.startButton,
                backgroundColor: app.themeColor,
                boxShadow: `0 6px 0 ${app.shadowColor}`
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(3px)';
                e.currentTarget.style.boxShadow = `0 3px 0 ${app.shadowColor}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 6px 0 ${app.shadowColor}`;
              }}
            >
              공부 시작하기 🚀
            </button>
          </div>
        ))}
      </div>

      <BackButton onClick={() => navigate('/')} />
    </div>
  );
};

export default AppSelection;