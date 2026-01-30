import client from './client';

// 사용자 정보 조회
export const getUserInfo = async (userId) => {
  try {
    const response = await client.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
