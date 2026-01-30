import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './mystatPage2.css'
import BackButton from '../components/common/backButton'
import { getHealthAnalysis } from '../api/resultApi'

export default function MyStatPage2() {
	const navigate = useNavigate()
	const [report, setReport] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [isSpeaking, setIsSpeaking] = useState(false)

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				const data = await getHealthAnalysis('f57ce428-5e03-4613-9186-cdbce942ba7a')
				setReport(data?.report || '')
			} catch (err) {
				setError('분석 결과를 불러오지 못했어요.')
				console.error('건강 분석 결과 로드 실패:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchAnalysis()
	}, [])

	const renderReport = (text) => {
		if (!text) return null
		return text.split('\n').map((line, index) => (
			<span key={index}>
				{line}
				<br />
			</span>
		))
	}

	const handleSpeak = () => {
		if (!report || isLoading || error) return
		const synth = window.speechSynthesis
		if (!synth) return
		synth.cancel()
		const utterance = new SpeechSynthesisUtterance(report)
		utterance.lang = 'ko-KR'
		utterance.onend = () => setIsSpeaking(false)
		utterance.onerror = () => setIsSpeaking(false)
		setIsSpeaking(true)
		synth.speak(utterance)
	}

	const handleStop = () => {
		const synth = window.speechSynthesis
		if (!synth) return
		synth.cancel()
		setIsSpeaking(false)
	}

	return (
		<div className="mystat2-page">
			<div className="mystat2-content">
				<h1 className="mystat2-title">내 상태 확인하기</h1>
				<div className="mystat2-center">
					<p className="mystat2-subtitle">
						인공지능이 그동안의 대화 내역을<br />
						기반으로 분석해줘요
					</p>

                    <div className="mystat2-tts-buttons">
						<button
							className="mystat2-speak-button"
							onClick={handleSpeak}
							disabled={!report || isLoading || error}
						>
							{isSpeaking ? '읽는 중...' : '읽어주기'}
						</button>
						<button
							className="mystat2-stop-button"
							onClick={handleStop}
							disabled={!isSpeaking}
						>
							멈추기
						</button>
					</div>
					<div className="mystat2-result-card">
						<p>
							{isLoading && '분석 결과를 불러오는 중이에요...'}
							{!isLoading && error && error}
							{!isLoading && !error && renderReport(report)}
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
