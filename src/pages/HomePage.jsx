import { useNavigate } from 'react-router-dom'
import Button from '../components/common/button'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <Button variant="green" onClick={() => console.log('버튼 1')}>
        오늘 몸은 어떠신가요?
      </Button>
      
      <Button onClick={() => console.log('버튼 2')}>
        내 정보 관리
      </Button>
      
      <Button onClick={() => navigate('/game-select')}>
        일일 두뇌 미션
      </Button>
      
      <Button onClick={() => console.log('버튼 4')}>
        스마트폰이랑 친해지기
      </Button>

      <Button onClick={() => console.log('버튼 5')}>
        건강 식품 쇼핑
      </Button>
    </div>
  )
}
