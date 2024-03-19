import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: baseURL, // 백엔드 api 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 인스턴스에 withCredentials 설정
});
export default api;
