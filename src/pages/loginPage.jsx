import { useNavigate } from 'react-router-dom'
import './loginPage.css'
import kakaoLoginImg from '../assets/icons/kakao_login.png'
import neulbomImg from '../assets/icons/neulbom.png'


export default function LoginPage() {
  const navigate = useNavigate()

  const handleKakaoLogin = () => {
    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-header">
          <img src={neulbomImg} alt="늘봄" className="logo-image" />
          <h1 className="login-title">늘 봄</h1>
          <p className="login-subtitle">당신의 매일이 봄날처럼, <br />늘 곁에서 봅니다</p>
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
