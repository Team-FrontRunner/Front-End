import { useNavigate } from 'react-router-dom'
import './myrecordPage.css'
import BackButton from '../components/common/backButton'
import brainIcon from '../assets/icons/brain2.png'

export default function MyRecordPage() {
  const navigate = useNavigate()

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

  const gameRecords = [
    { date: '2026년 01월 04일 | 14:30', points: '획득 포인트: 15 P' },
    { date: '2026년 01월 04일 | 10:15', points: '획득 포인트: 8 P' },
    { date: '2026년 01월 03일 | 18:50', points: '획득 포인트: 20 P' },
    { date: '2026년 01월 03일 | 09:05', points: '획득 포인트: 12 P' },
    { date: '2026년 01월 02일 | 16:20', points: '획득 포인트: 5 P' },
    { date: '2026년 01월 02일 | 11:45', points: '획득 포인트: 18 P' },
  ]

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
              className={`tag-button ${index === 0 ? 'active' : ''}`}
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
            <button key={index} className="tag-button">
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 게임 기록 리스트 */}
      <div className="game-records">
        {gameRecords.map((record, index) => (
          <div key={index} className="record-card">
            <div className="record-info">
              <div className="record-datetime">{record.date}</div>
              <div className="record-points">{record.points}</div>
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
