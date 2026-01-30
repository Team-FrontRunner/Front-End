import { useNavigate } from 'react-router-dom'
import './mystatPage.css'
import BackButton from '../components/common/backButton'
import heartIcon from '../assets/icons/heart.png'

export default function MyStatPage() {
  const navigate = useNavigate()

  const periodSettings = [
    { label: '일주일' },
    { label: '한 달' },
    { label: '반 년' },
    { label: '1년' },
  ]

  const categoryViews = [
    { label: '추위(2)' },
    { label: '허리 통증(11)' },
    { label: '관절 통증(3)' },
  ]

  const healthRecords = [
    { date: '2026년 01월 02일', content: '오늘 날씨가 너무 추운 것 같아' },
    { date: '2026년 01월 03일', content: '왜이렇게 추운겨' },
  ]

  return (
    <div className="mystat-page">
      {/* 상단 헤더 */}
      <div className="mystat-header">
        <div className="mystat-icon">
          <img src={heartIcon} alt="health" />
        </div>
        <h1 className="mystat-title">건강 기록 모아보기</h1>
      </div>

      {/* 기간 설정 섹션 */}
      <div className="mystat-section">
        <h2 className="section-label">기간 설정</h2>
        <div className="button-group">
          {periodSettings.map((item, index) => (
            <button key={index} className="tag-button">
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리별 보기 섹션 */}
      <div className="mystat-section">
        <h2 className="section-label">카테고리별 보기</h2>
        <div className="button-group">
          {categoryViews.map((item, index) => (
            <button key={index} className="tag-button">
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 건강 기록 리스트 */}
      <div className="health-records">
        {healthRecords.map((record, index) => (
          <div key={index} className="record-card">
            <div className="record-date">{record.date}</div>
            <div className="record-content">{record.content}</div>
          </div>
        ))}
      </div>

      {/* 돌아가기 버튼 */}
      <footer className="mystat-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
