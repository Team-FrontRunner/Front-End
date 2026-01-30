import { useNavigate } from 'react-router-dom'
import './settings.css'
import BackButton from '../components/common/backButton'
import settingsIcon from '../assets/icons/settings.png'

export default function Settings() {
  const navigate = useNavigate()

  const settingsMenuItems = [
    { label: '프로필 사진 변경' },
    { label: '서비스 초기화' },
    { label: '서비스 로그아웃' },
    { label: '서비스 탈퇴하기' },
  ]

  return (
    <div className="settings-page">
      {/* 상단 설정 아이콘 섹션 */}
      <div className="settings-header">
        <div className="settings-icon">
          <img src={settingsIcon} alt="settings" />
        </div>
        <h1 className="settings-title">앱 설정</h1>
      </div>

      {/* 메뉴 카드 */}
      <div className="settings-menu-card">
        {settingsMenuItems.map((item, index) => (
          <button key={index} className="settings-menu-item">
            <span>{item.label}</span>
            <span className="arrow">›</span>
          </button>
        ))}
      </div>

      {/* 돌아가기 버튼 */}
      <footer className="settings-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
