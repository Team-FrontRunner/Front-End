import client from './client';

// 쇼핑몰 데이터 가져오기 (상품 목록)
export const getProducts = async () => {
  try {
    const response = await client.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('상품 데이터 조회 실패:', error);
    throw error;
  }
};
