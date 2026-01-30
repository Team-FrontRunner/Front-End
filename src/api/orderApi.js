import client from './client';

// 상품 주문
export const createOrder = async (userId, orderData) => {
  try {
    const response = await client.post(`/api/order/${userId}`, orderData);
    return response.data;
  } catch (error) {
    console.error('상품 주문 실패:', error);
    throw error;
  }
};
