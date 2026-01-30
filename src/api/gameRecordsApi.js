import client from './client';

// 게임 기록 조회
export const getGameRecords = async (userId) => {
  try {
    const response = await client.get(`/records/game/${userId}`);
    return response.data;
  } catch (error) {
    console.error('게임 기록 조회 실패:', error);
    throw error;
  }
};

// 게임 기록 저장
export const createGameRecord = async (userId, gameData) => {
  try {
    const response = await client.post(`/records/game/${userId}`, gameData);
    return response.data;
  } catch (error) {
    console.error('게임 기록 저장 실패:', error);
    throw error;
  }
};
