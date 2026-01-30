import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingPage = () => {
  const navigate = useNavigate();

  const userData = { name: "박정자", points: 5455 };
  const productList = [
    { id: 1, name: "비타민C 3000 10포", price: 10000, status: "품절", imageUrl: "" },
    { id: 2, name: "관절엔 콘드로이친", price: 20000, status: "포인트 부족", imageUrl: "" },
    { id: 3, name: "델몬트 바나나 1송이", price: 5000, status: "구매 가능", imageUrl: "" },
    { id: 4, name: "논산 설향 딸기 15개", price: 20000, status: "포인트 부족", imageUrl: "" },
    { id: 5, name: "홍삼진액 세트", price: 35000, status: "포인트 부족", imageUrl: "" },
    { id: 6, name: "유기농 구운란 10알", price: 6000, status: "포인트 부족", imageUrl: "" },
  ];

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      margin: '0 auto',
      backgroundColor: '#F9F9F4',
      fontFamily: '"Pretendard", sans-serif',
      position: 'relative',
      overflowY: 'auto',
      padding: '20px',
      boxSizing: 'border-box'
    },
    pointCard: {
      backgroundColor: '#84CC16',
      borderRadius: '24px',
      padding: '25px',
      color: 'white',
      boxShadow: '0 8px 15px rgba(132, 204, 22, 0.2)',
      marginBottom: '30px',
      marginTop: '20px'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      paddingBottom: '140px' // 버튼에 가려지지 않게 하단 여백 충분히 확보
    },
    productCard: {
      display: 'flex',
      flexDirection: 'column',
    },
    imageButton: {
      width: '100%',
      aspectRatio: '1 / 1',
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      marginBottom: '12px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'all 0.1s ease',
      outline: 'none'
    },
    productImage: {
      width: '75%',
      height: '75%',
      objectFit: 'contain'
    },
    productName: { fontSize: '16px', fontWeight: '800', color: '#333', marginBottom: '4px' },
    productPrice: { fontSize: '18px', fontWeight: '900', color: '#84CC16', marginBottom: '4px' },
    statusLabel: (status) => ({
      fontSize: '14px',
      fontWeight: '700',
      color: status === '구매 가능' ? '#84CC16' : status === '포인트 부족' ? '#FF5E5E' : '#999'
    }),
    
    // [핵심 수정] 돌아가기 버튼: 화면 정중앙 하단 배치
    backBtn: {
      position: 'fixed', // 화면에 고정
      bottom: '50px',   // 바닥에서 50px 위
      left: '50%',      // 왼쪽에서 50% 지점
      transform: 'translateX(-50%)', // 버튼 자신의 너비 절반만큼 왼쪽으로 밀어서 정중앙 맞춤
      backgroundColor: '#84CC16',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '15px 40px', // 시안처럼 좀 더 길쭉하게 변경
      fontSize: '22px',
      fontWeight: '900',
      boxShadow: '0 10px 20px rgba(132, 204, 22, 0.3)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      zIndex: 1000,
      transition: 'all 0.1s ease',
      whiteSpace: 'nowrap' // 텍스트 줄바꿈 방지
    }
  };

  return (
    <div style={styles.container}>
      {/* 포인트 카드 섹션 */}
      <div style={styles.pointCard}>
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          {userData.name}님의 포인트
        </div>
        <div style={{ fontSize: '36px', fontWeight: '900' }}>
          {userData.points.toLocaleString()} P
        </div>
      </div>

      {/* 상품 그리드 섹션 */}
      <div style={styles.productGrid}>
        {productList.map((item) => (
          <div key={item.id} style={styles.productCard}>
            <button 
              style={styles.imageButton}
              onClick={() => console.log(`${item.name} 클릭`)}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} style={styles.productImage} />
              ) : (
                <div style={{ color: '#DDD', fontSize: '45px' }}>🖼️</div>
              )}
            </button>
            <div style={styles.productName}>{item.name}</div>
            <div style={styles.productPrice}>{item.price.toLocaleString()} P</div>
            <div style={styles.statusLabel(item.status)}>{item.status}</div>
          </div>
        ))}
      </div>

      {/* [수정된 위치] 돌아가기 버튼 */}
      <button 
        style={styles.backBtn} 
        onClick={() => navigate(-1)}
        onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(0.95)';
            e.currentTarget.style.boxShadow = '0 5px 10px rgba(132, 204, 22, 0.2)';
        }}
        onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(132, 204, 22, 0.3)';
        }}
      >
        <span style={{ fontSize: '24px' }}>〈</span> 
        <span>돌아가기</span>
      </button>
    </div>
  );
};

export default ShoppingPage;