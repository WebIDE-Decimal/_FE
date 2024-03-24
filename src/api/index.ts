import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: baseURL, // 백엔드 api 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.url !== "/reissue" && config.url !== "/login") {
      config.headers["access_token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url !== "/login") {
        originalRequest._retry = true;
        return await api
          .post("/reissue")
          .then((res) => {
            if (res.status === 200) {
              api.defaults.headers.common["access_token"] =
                res.headers.access_token;
              originalRequest.headers["access_token"] =
                res.headers.access_token;
              localStorage.setItem("access_token", res.headers.access_token);
              originalRequest._retry = false;
              if (originalRequest.method === "post") {
                return api.post(originalRequest.url, originalRequest.data);
              } else if (originalRequest.method === "get") {
                return api.get(originalRequest.url, {
                  params: originalRequest.params,
                });
              } else if (originalRequest.method === "put") {
                return api.put(originalRequest.url, originalRequest.data);
              } else if (originalRequest.method === "delete") {
                return api.delete(originalRequest.url);
              } else if (originalRequest.method === "patch") {
                return api.patch(originalRequest.url);
              }
            }
          })
          .catch((error) => {
            console.log("토큰 재발급 실패", error);
            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  },
);

export default api;
