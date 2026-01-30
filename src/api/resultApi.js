import client from './client'

// 건강 분석 결과 조회
export const getHealthAnalysis = async (userId) => {
	try {
		const response = await client.get(`/api/records/health/analysis/${userId}`)
		return response.data
	} catch (error) {
		console.error('건강 분석 결과 조회 실패:', error)
		throw error
	}
}
