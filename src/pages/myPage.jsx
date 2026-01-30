import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './myPage.css'
import BackButton from '../components/common/backButton'
import grandmaIcon from '../assets/icons/grandma.png'
import starIcon from '../assets/icons/star.png'
import { getUserInfo } from '../api/userApi'

export default function MyPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
  try {
    const data = await getUserInfo("f57ce428-5e03-4613-9186-cdbce942ba7a");
    console.log('User data:', data); 
    setUser(data);
  } catch (error) {
    console.error('유저 정보 로드 실패:', error);
  }
}

    fetchUser();
  }, [])

  return (
    <div className="my-page">
      {/* 상단 프로필 섹션 */}
      <div className="profile-header">
        <div className="profile-greeting">
          <div className="profile-icon">
            <img src={user?.profile_image || grandmaIcon} alt="profile" />
          </div>
          <div className="greeting-text">
            <h2>{user?.name}님!</h2>
            <p>안녕하세요!</p>
          </div>
        </div>
      </div>

      {/* 포인트 섹션 */}
      <div className="points-section">
        <div className="point-card primary">
          <div className="point-card-star">
            <img src={starIcon} alt="star" />
          </div>
          <p className="point-label">이만큼 모으셨어요!</p>
          <h3 className="point-amount">
            {(user?.current_point ?? 0).toLocaleString()} 포인트
          </h3>
        </div>

        <div className="point-card secondary">
          <p className="point-label">오늘 더 받을 수 있어요!</p>
          <h3 className="point-amount">555 포인트</h3>
        </div>
      </div>

      {/* 메뉴 카드 */}
      <div className="menu-card my-page-menu">
        <button className="menu-item" onClick={() => navigate('/exchange')}>
          <span>포인트 지역화폐로 바꾸기</span>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => navigate('/mystat')}>
          <span>내 건강 기록 모아보기</span>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => navigate('/myrecord')}>
          <span>내 게임 기록 보기</span>
          <span className="arrow">›</span>
        </button>

        <button className="menu-item" onClick={() => navigate('/settings')}>
          <span>앱 설정</span>
          <span className="arrow">›</span>
        </button>
      </div>

      {/* 돌아가기 버튼 */}
      <footer className="my-page-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
