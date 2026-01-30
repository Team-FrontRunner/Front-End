import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './sttPage.css'
import BackButton from '../components/common/backButton'

export default function SttPage() {
  const navigate = useNavigate()
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const handleCallClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.')
      return
    }

    if (isListening) {
      // 중지
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
      return
    }

    // 시작
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'ko-KR'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (event) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' '
        } else {
          interimTranscript += transcriptPart
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript)
      }
    }

    recognition.onerror = (event) => {
      console.error('음성 인식 오류:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const handleSend = () => {
    if (!transcript.trim()) {
      alert('보낼 내용이 없습니다.')
      return
    }
    console.log('전송할 텍스트:', transcript)
    // TODO: 백엔드로 전송 로직 추가
    alert(`전송: ${transcript}`)
  }

  return (
    <div className="stt-page">
      <div className="stt-content">
        <button className="call-button" onClick={handleCallClick}>
          {isListening ? '🛑' : '📞'}
        </button>
        
        {transcript && (
          <div className="transcript-box">
            <p>{transcript}</p>
          </div>
        )}

        {transcript && (
          <button className="send-button" onClick={handleSend}>
            보내기
          </button>
        )}
      </div>

      <footer className="stt-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
