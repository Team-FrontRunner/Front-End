import './button.css'

export default function Button({ children, onClick, showArrow = true, variant = 'default' }) {
  return (
    <button className={`custom-button ${variant}`} onClick={onClick}>
      <span className="button-text">{children}</span>
      {showArrow && <span className="button-arrow">→</span>}
    </button>
  )
}
