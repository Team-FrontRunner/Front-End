import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import heartIcon from '../assets/icons/heart.png'
import profileIcon from '../assets/icons/profile.png'
import brainIcon from '../assets/icons/brain.png'
import smartphoneIcon from '../assets/icons/smartphone.png'
import shopIcon from '../assets/icons/shop.png'
import starIcon from '../assets/icons/star.png'
import { getUserInfo } from '../api/userApi'

export default function HomePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo("f57ce428-5e03-4613-9186-cdbce942ba7a");
        setUser(data);
      } catch (error) {
        console.error('유저 정보 로드 실패:', error);
      }
    }

    fetchUser();
  }, [])

  return (
    <div className="home-page">
      {/* 상단 초록색 섹션 */}
      <div className="green-header">
        <h1 className="main-title">
          오늘 몸은<br />
          어떠신가요?
        </h1>
        <button className="health-check-btn" onClick={() => navigate('/mystat2')}>
          <div className="health-icon">
            <img src={heartIcon} alt="heart" />
          </div>
          <span onClick={() => navigate('/mystat')}>내 건강 기록 확인</span>
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 내 정보 관리 + 포인트 카드 */}
        <div className="info-point-card">
          <button className="info-menu">
            <div className="menu-icon green-icon">
              <img src={profileIcon} alt="profile" />
            </div>
            <span>내 정보 관리하기</span>
          </button>

          {/* 포인트 배지 */}
          <button className="point-badge" onClick={() => navigate('/my-page')}>
            <div className="star-icon">
              <img src={starIcon} alt="star" />
            </div>
            <span className="point-text">{(user?.current_point ?? 0).toLocaleString()} 포인트</span>
          </button>
        </div>

        {/* 메뉴 카드 */}
        <div className="menu-card">
          <button className="menu-item" onClick={() => navigate('/game-select')}>
            <div className="menu-icon-box green">
              <img src={brainIcon} alt="brain" />
            </div>
            <span>일일 두뇌 미션</span>
            <span className="arrow">›</span>
          </button>

          <button className="menu-item" onClick={() => navigate('/training')}>
            <div className="menu-icon-box cyan">
              <img src={smartphoneIcon} alt="smartphone" />
            </div>
            <span>스마트폰이랑 친해지기</span>
            <span className="arrow">›</span>
          </button>

          <button className="menu-item" onClick={() => navigate('/shopping')}>
            <div className="menu-icon-box cyan">
              <img src={shopIcon} alt="shop" />
            </div>
            <span>건강 식품 쇼핑</span>
            <span className="arrow">›</span>
          </button>
        </div>

        {/* 전화 테스트 버튼 */}
        <button className="phone-test-btn" onClick={() => navigate('/stt')}>
          전화 테스트
        </button>
      </div>
    </div>
  )
}
