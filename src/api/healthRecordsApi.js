import client from './client';

// 건강 기록 조회
export const getHealthRecords = async (userId) => {
  try {
    const response = await client.get(`/api/records/health/${userId}`);
    return response.data;
  } catch (error) {
    console.error('건강 기록 조회 실패:', error);
    throw error;
  }
};

// 건강 기록 저장
export const createHealthRecord = async (userId, healthData) => {
  try {
    const response = await client.post(`/api/records/health/${userId}`, healthData);
    return response.data;
  } catch (error) {
    console.error('건강 기록 저장 실패:', error);
    throw error;
  }
};
