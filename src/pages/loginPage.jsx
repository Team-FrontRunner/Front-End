import { useNavigate } from 'react-router-dom'
import './loginPage.css'
import kakaoLoginImg from '../assets/icons/kakao_login.png'


export default function LoginPage() {
  const navigate = useNavigate()

  const handleKakaoLogin = () => {
    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-header">
          <h1 className="login-title">(서비스 이름)</h1>
          <p className="login-subtitle">카카오톡으로 간편하게 시작하세요</p>
        </div>
      </div>

      <footer className="login-footer">
        <button className="kakao-login-button" onClick={handleKakaoLogin}>
          <img src={kakaoLoginImg} alt="카카오 로그인" />
        </button>
      </footer>
    </div>
  )
}
