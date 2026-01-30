// axios 기본설정

import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 나중에 서버 주소로 변경
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

export default client;