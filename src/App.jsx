import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameSelectPage from './pages/gameSelectPage'
import AppTrainingPage from './pages/appTrainingPage'
import ShoppingPage from './pages/shoppingPage'
import MyPage from './pages/myPage'
import './App.css'
import CardMatchGame from './pages/cardMatchGame'
import FirstMap from './pages/NaverMapStudy/FirstMap'
import SecondMap from './pages/NaverMapStudy/SecondMap'
import ThridMap from './pages/NaverMapStudy/ThridMap'
import Settings from './pages/settings.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-select" element={<GameSelectPage />} />
        <Route path="/training" element={<AppTrainingPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/card-game" element={<CardMatchGame />} />
        <Route path="/map" element={<FirstMap/>} />
        <Route path="/gilchatgi" element={<SecondMap/>} />
        <Route path="/jido" element={<ThridMap/>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
