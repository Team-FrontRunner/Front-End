import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './myrecordPage.css'
import BackButton from '../components/common/backButton'
import brainIcon from '../assets/icons/brain2.png'
import { getGameRecords } from '../api/gameRecordsApi'

export default function MyRecordPage() {
  const navigate = useNavigate()
  const [gameRecords, setGameRecords] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('일주일')

  const periodSettings = [
    { label: '일주일' },
    { label: '한 달' },
    { label: '반년' },
    { label: '1년' },
  ]

  const gameCategories = [
    { label: '산수 연습' },
    { label: '카드 맞추기' },
    { label: '시 짓기' },
    { label: '십자말 풀이' },
    { label: '기억력 게임' },
    { label: '퍼즐 맞추기' },
  ]

  useEffect(() => {
    const fetchGameRecords = async () => {
      try {
        const data = await getGameRecords("f57ce428-5e03-4613-9186-cdbce942ba7a");
        setGameRecords(data);
      } catch (error) {
        console.error('게임 기록 로드 실패:', error);
      }
    }

    fetchGameRecords();
  }, [])

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const getPeriodDays = (period) => {
    const periodMap = {
      '일주일': 7,
      '한 달': 30,
      '반년': 180,
      '1년': 365
    }
    return periodMap[period] || 7
  }

  const isDateInPeriod = (dateString, days) => {
    const recordDate = new Date(dateString)
    const today = new Date()
    const diffTime = today - recordDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= days
  }

  const filteredRecords = gameRecords.filter(record => {
    const categoryMatch = !selectedCategory || record.category === selectedCategory
    const periodMatch = isDateInPeriod(record.played_at, getPeriodDays(selectedPeriod))
    return categoryMatch && periodMatch
  })

  return (
    <div className="myrecord-page">
      {/* 상단 헤더 */}
      <div className="myrecord-header">
        <div className="myrecord-icon">
          <img src={brainIcon} alt="brain" />
        </div>
        <h1 className="myrecord-title">두뇌 미션 기록</h1>
      </div>

      {/* 기간 설정 섹션 */}
      <div className="myrecord-section">
        <h2 className="section-label">기간 설정</h2>
        <div className="button-group">
          {periodSettings.map((item, index) => (
            <button 
              key={index} 
              className={`tag-button ${selectedPeriod === item.label ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리별 보기 섹션 */}
      <div className="myrecord-section">
        <h2 className="section-label">카테고리별 보기</h2>
        <div className="button-group">
          {gameCategories.map((item, index) => (
            <button 
              key={index} 
              className={`tag-button ${selectedCategory === item.label ? 'active' : ''}`}
              onClick={() => handleCategoryClick(item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 게임 기록 리스트 */}
      <div className="game-records">
        {filteredRecords.map((record, index) => (
          <div key={index} className="record-card">
            <div className="record-info">
              <div className="record-category">{record.category}</div>
              <div className="record-datetime">{record.played_at}</div>
              <div className="record-points">{record.gain_point} 포인트</div>
            </div>
          </div>
        ))}
      </div>

      {/* 돌아가기 버튼 */}
      <footer className="myrecord-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
