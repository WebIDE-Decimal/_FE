import api from "./index";

// 채팅 목록 가져오기
export const getChatsList = async () => {
  try {
    const response = await api.get("/chat/rooms");

    return response.data;
  } catch (error) {
    console.error("getChatsList API 호출 중 에러 발생:", error);
    throw error;
  }
};
