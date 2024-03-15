import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: baseURL, // 백엔드 api 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
