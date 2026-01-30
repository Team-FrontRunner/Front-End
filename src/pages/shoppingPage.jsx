import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShoppingPage = () => {
  const navigate = useNavigate();

  // [백엔드 데이터 샘플]
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
      paddingBottom: '120px'
    },
    productCard: {
      display: 'flex',
      flexDirection: 'column',
    },
    // [수정] 클릭 가능한 사진 박스 스타일
    imageButton: {
      width: '100%',
      aspectRatio: '1 / 1',
      backgroundColor: '#FFFFFF',
      borderRadius: '24px', // 좀 더 둥글게 수정
      marginBottom: '12px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: 'none', // 버튼 기본 테두리 제거
      cursor: 'pointer',
      padding: 0,
      transition: 'transform 0.1s ease, box-shadow 0.1s ease', // 애니메이션 추가
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
    backBtn: {
      position: 'fixed',
      bottom: '40px',
      left: '30px',
      backgroundColor: '#84CC16',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '12px 25px',
      fontSize: '22px',
      fontWeight: '900',
      boxShadow: '0 6px 15px rgba(132, 204, 22, 0.4)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 1000
    }
  };

  // 사진 클릭 시 실행될 함수
  const handleProductClick = (product) => {
    if (product.status === '품절') {
      alert('이 상품은 현재 품절 상태입니다.');
    } else {
      // 상세 페이지로 이동하거나 구매 모달을 띄우는 로직
      console.log(`${product.name} 클릭됨`);
      // navigate(`/product/${product.id}`); // 예시 주소
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pointCard}>
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          {userData.name}님의 포인트
        </div>
        <div style={{ fontSize: '36px', fontWeight: '900' }}>
          {userData.points.toLocaleString()} P
        </div>
      </div>

      <div style={styles.productGrid}>
        {productList.map((item) => (
          <div key={item.id} style={styles.productCard}>
            {/* [수정] 이미지 박스를 버튼으로 변경 */}
            <button 
              style={styles.imageButton}
              onClick={() => handleProductClick(item)}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)'; // 누르면 작아짐
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // 떼면 복구
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
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

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        <span>〈</span> 돌아가기
      </button>
    </div>
  );
};

export default ShoppingPage;