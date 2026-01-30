import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';
import { getUserInfo } from '../api/userApi';
import { getProducts } from '../api/productsApi';
import { createOrder } from '../api/orderApi'; 

const ShoppingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, productsData] = await Promise.all([
          getUserInfo("f57ce428-5e03-4613-9186-cdbce942ba7a"),
          getProducts()
        ]);
        setUser(userData);
        setProducts(productsData);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    }

    fetchData();
  }, []);

  // [백엔드 데이터 샘플]
  const userData = { name: user?.name || "사용자", points: user?.current_point || 0 };
  
  // 상품 목록에 status 추가 (품절, 포인트 부족, 구매 가능)
  const productList = useMemo(() => {
    return products.map(product => {
      let status;
      if (product.quantity === 0) {
        status = "품절";
      } else if (product.price > userData.points) {
        status = "포인트 부족";
      } else {
        status = "구매 가능";
      }
      
      return {
        id: product.item_id,
        item_id: product.item_id,
        name: product.name,
        price: product.price,
        status: status,
        imageUrl: product.image_url || ""
      };
    });
  }, [products, userData.points]);

  const handleOrderClick = async (item) => {
    // 구매 불가능한 경우 처리
    if (item.status === "품절") {
      alert("죄송합니다. 현재 품절된 상품입니다.");
      return;
    }
    if (item.status === "포인트 부족") {
      alert("포인트가 부족합니다.");
      return;
    }

    const confirmed = window.confirm(`${item.name}을(를) ${item.price.toLocaleString()}P에 구매하시겠습니까?`);
    if (!confirmed) return;

    try {
      const orderData = {
        user_id: "f57ce428-5e03-4613-9186-cdbce942ba7a",
        item_id: item.item_id,
        used_point: item.price
      };

      await createOrder("f57ce428-5e03-4613-9186-cdbce942ba7a", orderData);
      alert(`구매가 완료되었습니다!\n사용 포인트: ${item.price.toLocaleString()}P`);
      
      // 데이터 재로드
      const [userData, productsData] = await Promise.all([
        getUserInfo("f57ce428-5e03-4613-9186-cdbce942ba7a"),
        getProducts()
      ]);
      setUser(userData);
      setProducts(productsData);
    } catch (error) {
      console.error('주문 실패:', error);
      alert('주문에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
      backgroundColor: '#4AB000',
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
      paddingBottom: '140px' 
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
    productName: { fontSize: '24px', fontWeight: '800', color: '#333', marginBottom: '4px' },
    productPrice: { fontSize: '23px', fontWeight: '900', color: '#84CC16', marginBottom: '4px' },
    statusLabel: (status) => ({
      fontSize: '19px',
      fontWeight: '700',
      color: status === '구매 가능' ? '#84CC16' : status === '포인트 부족' ? '#FF5E5E' : '#999'
    })
  };

  return (
    <div style={styles.container}>
      {/* 포인트 카드 섹션 */}
      <div style={styles.pointCard}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginBottom: '10px',color: '#FDFBEE' }}>
          {userData.name}님의 포인트
        </div>
        <div style={{ fontSize: '37px', fontWeight: '900', color: '#FDFBEE' }}>
          {userData.points.toLocaleString()} P
        </div>
      </div>

      {/* 상품 그리드 섹션 */}
      <div style={styles.productGrid}>
        {productList.map((item) => (
          <div key={item.id} style={styles.productCard}>
            <button 
              style={styles.imageButton}
              onClick={() => handleOrderClick(item)}
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

      <BackButton onClick={() => navigate('/home')} />
    </div>
  );
};

export default ShoppingPage;