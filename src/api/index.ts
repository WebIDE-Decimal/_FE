import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://43.203.98.60:8080/api", // 백엔드 api 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
