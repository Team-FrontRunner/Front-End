import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './mystatPage.css'
import BackButton from '../components/common/backButton'
import heartIcon from '../assets/icons/heart.png'
import { getHealthRecords } from '../api/healthRecordsApi'

export default function MyStatPage() {
  const navigate = useNavigate()
  const [healthRecords, setHealthRecords] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('일주일')

  const periodSettings = [
    { label: '일주일' },
    { label: '한 달' },
    { label: '반 년' },
    { label: '1년' },
  ]

  // healthRecords에서 category별로 자동 분류
  const categoryViews = useMemo(() => {
    const categoryCount = {};
    healthRecords.forEach(record => {
      const category = record.category;
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    });
    
    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      label: `${category}(${count})`
    }));
  }, [healthRecords])

  // 선택된 카테고리에 따라 필터링된 기록
  const filteredRecords = useMemo(() => {
    if (!selectedCategory) return healthRecords;
    return healthRecords.filter(record => record.category === selectedCategory);
  }, [healthRecords, selectedCategory])

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  }

  const getPeriodDays = (period) => {
    const periodMap = {
      '일주일': 7,
      '한 달': 30,
      '반 년': 180,
      '1년': 365
    }
    return periodMap[period] || 7
  }

  const isDateInPeriod = (dateString, days) => {
    const recordDate = new Date(dateString)
    const today = new Date()
    const diffTime = today - recordDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= days
  }

  const filteredRecordsByPeriod = useMemo(() => {
    const categoryFiltered = selectedCategory 
      ? healthRecords.filter(record => record.category === selectedCategory)
      : healthRecords
    
    return categoryFiltered.filter(record => 
      isDateInPeriod(record.created_at, getPeriodDays(selectedPeriod))
    )
  }, [healthRecords, selectedCategory, selectedPeriod])

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        const data = await getHealthRecords("f57ce428-5e03-4613-9186-cdbce942ba7a");
        setHealthRecords(data);
      } catch (error) {
        console.error('건강 기록 로드 실패:', error);
      }
    }

    fetchHealthRecords();
  }, [])

  return (
    <div className="mystat-page">
      {/* 상단 헤더 */}
      <div className="mystat-header">
        <div className="mystat-icon">
          <img src={heartIcon} alt="health" />
        </div>
        <h1 className="mystat-title">건강 기록 모아보기</h1>
      </div>

      {/* 기간 설정 섹션 */}
      <div className="mystat-section">
        <h2 className="section-label">어느 기간 기록을 볼까요?</h2>
        <div className="button-group">
          {periodSettings.map((item, index) => (
            <button 
              key={index} 
              className={`tag-button ${selectedPeriod === item.label ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리별 보기 섹션 */}
      <div className="mystat-section">
        <h2 className="section-label">무슨 종류의 기록을 볼까요?</h2>
        <div className="button-group">
          {categoryViews.map((item, index) => (
            <button 
              key={index} 
              className={`tag-button ${selectedCategory === item.category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(item.category)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 건강 기록 리스트 */}
      <div className="health-records">
        {filteredRecordsByPeriod.map((record, index) => (
          <div key={index} className="record-card">
            <div className="record-date">{record.created_at}</div>
            <div className="record-content">{record.content}</div>
          </div>
        ))}
      </div>

      {/* 돌아가기 버튼 */}
      <footer className="mystat-footer">
        <BackButton onClick={() => navigate(-1)} />
      </footer>
    </div>
  )
}
