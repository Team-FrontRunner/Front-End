import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './exchangePage.css'
import BackButton from '../components/common/backButton'
import { getUserInfo } from '../api/userApi'

export default function ExchangePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [pointToExchange, setPointToExchange] = useState(0)
  const minimumExchange = 5000
  const selectedLocalCurrency = '세종사랑상품권'

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

  const currentPoints = user?.current_point ?? 0

  const handleMaxPoint = () => {
    setPointToExchange(currentPoints)
  }

  const handleExchange = () => {
    if (pointToExchange === 0) {
      alert('전환할 포인트를 입력해주세요.')
      return
    }
    if (currentPoints < minimumExchange) {
      alert(`최소 ${minimumExchange}포인트 이상 필요합니다.`)
      return
    }
    alert(`${pointToExchange} 포인트를 전환하시겠습니까?`)
  }

  return (
    <div className="exchange-page">
      {/* 상단 제목 */}
      <div className="exchange-header">
        <h1 className="exchange-title">포인트 전환</h1>
      </div>

      {/* 현재 포인트 표시 */}
      <div className="exchange-content">
        <div className="current-points-section">
          <p className="points-label">지금까지 모은 포인트</p>
          <h2 className="points-amount">{currentPoints.toLocaleString()} P</h2>
        </div>

        {/* 안내 메시지 */}
        <div className="info-message">
          <div className="info-icon">ℹ</div>
          <p>5,000 포인트부터 전환 가능해요!</p>
        </div>

        {/* 우리 지역화폐 섹션 */}
        <div className="local-currency-section">
          <h3 className="section-title">우리 지역화폐</h3>
          <div className="currency-info">
            <div className="currency-location">
              <span className="location-icon">📍</span>
              <p>GPS 기반으로 확인된 지역화폐입니다.</p>
            </div>
          </div>
          <button className="currency-select">
            <span className="currency-icon">📍</span>
            <span>{selectedLocalCurrency}</span>
            <span className="check-mark">✓</span>
          </button>
        </div>

        {/* 바꿀 포인트 입력 섹션 */}
        <div className="exchange-input-section">
          <h3 className="section-title">바꿀 포인트 입력</h3>
          <div className="input-wrapper">
            <input 
              type="number" 
              value={pointToExchange} 
              onChange={(e) => setPointToExchange(parseInt(e.target.value) || 0)}
              className="points-input"
              placeholder="0"
            />
            <span className="input-unit">P</span>
            <button className="max-button" onClick={handleMaxPoint}>전액 입력</button>
          </div>
        </div>
      </div>

      {/* 출금하기 버튼 */}
      <div className="exchange-footer">
        <button className="exchange-button" onClick={handleExchange}>출금하기</button>
        <BackButton onClick={() => navigate(-1)} />
      </div>
    </div>
  )
}
