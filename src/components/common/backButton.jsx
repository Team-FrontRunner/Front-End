 import './backButton.css'

export default function BackButton({ onClick }) {

  return (

    <button className="back-button" onClick={onClick}>

      <span className="back-arrow">‹</span>

      <span>돌아가기</span>

    </button>

  )

}