import { useNavigate } from 'react-router-dom'
import './mystatPage2.css'
import BackButton from '../components/common/backButton'

export default function MyStatPage2() {
	const navigate = useNavigate()

	return (
		<div className="mystat2-page">
			<div className="mystat2-content">
				<h1 className="mystat2-title">내 상태 확인하기</h1>
				<div className="mystat2-center">
					<p className="mystat2-subtitle">
						인공지능이 그동안의 대화 내역을<br />
						기반으로 분석해줘요
					</p>

					<div className="mystat2-result-card">
						<p>
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용<br />
							내용내용내용내용내용
						</p>
					</div>
				</div>
			</div>

			<footer className="mystat2-footer">
				<BackButton onClick={() => navigate('/home')} />
			</footer>
		</div>
	)
}
