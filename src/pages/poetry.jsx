import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backButton';

const PoemApp = () => {
  const navigate = useNavigate();
  const [selectedPoem, setSelectedPoem] = useState(null);

  // 시 데이터 (어르신들이 좋아하시는 대표 시들)
  const poemsData = [
    {
      id: 1,
      title: '서시',
      author: '윤동주',
      content: '죽는 날까지 하늘을 우러러\n한 점 부끄럼이 없기를,\n잎새에 이는 바람에도\n나는 괴로워했다.\n별을 노래하는 마음으로\n모든 죽어가는 것을 사랑해야지\n그리고 나한테 주어진 길을\n걸어가야겠다.'
    },
    {
      id: 2,
      title: '진달래꽃',
      author: '김소월',
      content: '나 보기가 역겨워\n가실 때에는\n말없이 고이 보내 드리우리다.\n영변에 약산\n진달래꽃\n아름 따다 가실 길에 뿌리우리다.'
    },
    {
      id: 3,
      title: '풀꽃',
      author: '나태주',
      content: '자세히 보아야 예쁘다\n\n오래 보아야 사랑스럽다\n\n너도 그렇다.'
    }
  ];

  const styles = {
    container: {
      width: '390px',
      height: '844px',
      margin: '0 auto',
      backgroundColor: '#FDF5E6', // 한지 느낌의 따뜻한 배경색
      fontFamily: '"Pretendard", sans-serif',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    header: {
      padding: '50px 20px 20px',
      textAlign: 'center',
      borderBottom: '2px solid #E6D5B8'
    },
    list: {
      padding: '20px',
      overflowY: 'auto',
      flex: 1
    },
    poemCard: {
      backgroundColor: '#FFF',
      borderRadius: '20px',
      padding: '30px 20px',
      marginBottom: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      textAlign: 'center',
      border: '1px solid #E6D5B8'
    },
    // --- [시 읽기 화면 스타일] ---
    readView: {
      padding: '40px 25px',
      overflowY: 'auto',
      flex: 1,
      lineHeight: '1.8' // 줄 간격을 아주 넓게 해서 읽기 편하게
    },
    hugeTitle: {
      fontSize: '42px', // 진짜 크게
      fontWeight: '900',
      color: '#433422',
      marginBottom: '10px',
      textAlign: 'center'
    },
    hugeAuthor: {
      fontSize: '24px',
      color: '#8B7355',
      marginBottom: '40px',
      textAlign: 'center',
      fontWeight: '600'
    },
    hugeContent: {
      fontSize: '32px', // 본문 글씨 크기 32px (매우 큼)
      fontWeight: '700',
      color: '#2C2318',
      whiteSpace: 'pre-line', // 줄바꿈 적용
      wordBreak: 'keep-all' // 단어 단위로 줄바꿈
    }
  };

  return (
    <div style={styles.container}>
      {!selectedPoem ? (
        <>
          <header style={styles.header}>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#433422' }}>오늘의 추천 시 📮</h1>
          </header>
          <div style={styles.list}>
            {poemsData.map((poem) => (
              <div key={poem.id} style={styles.poemCard} onClick={() => setSelectedPoem(poem)}>
                <span style={{ fontSize: '30px', fontWeight: '900', display: 'block' }}>{poem.title}</span>
                <span style={{ fontSize: '20px', color: '#8B7355' }}>{poem.author}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={styles.readView}>
          <h2 style={styles.hugeTitle}>{selectedPoem.title}</h2>
          <p style={styles.hugeAuthor}>{selectedPoem.author}</p>
          <p style={styles.hugeContent}>{selectedPoem.content}</p>
          <div style={{ height: '150px' }}></div> {/* 하단 여백 */}
        </div>
      )}

      {/* 뒤로가기 버튼 */}
      <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
        <BackButton onClick={() => {
          if (selectedPoem) setSelectedPoem(null);
          else navigate('/game-select');
        }} />
      </div>
    </div>
  );
};

export default PoemApp;