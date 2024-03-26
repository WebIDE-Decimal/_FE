import { AxiosError } from "axios";
import api from "./index";

const BASE_URL = "recruit";

// 모든 모집 게시글 조회
export const getAllRecruitPosts = async () => {
  try {
    const response = await api.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching recruit posts:", error);
    throw error;
  }
};

// 특정 ID의 모집 게시글 조회
export const getRecruitPostById = async (postId: number) => {
  try {
    const response = await api.get(`${BASE_URL}/${postId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError; // Type assertion to AxiosError
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      console.error(
        `Server responded with status code ${axiosError.response.status}`
      );
      console.error("Response data:", axiosError.response.data);
      console.error("Response headers:", axiosError.response.headers);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("No response received from the server");
      console.error("Request:", axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", axiosError.message);
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};

// 로그인 사용자가 작성한 모든 모집 게시글 조회
export const getMyRecruitPosts = async () => {
  try {
    const response = await api.get(`${BASE_URL}/myPost`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching my recruit posts:", error);
    throw error;
  }
};

// 새 모집 게시글 생성
export const createRecruitPost = async (postData: any) => {
  try {
    const response = await api.post(`${BASE_URL}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error while creating recruit post:", error);
    throw error;
  }
};

// 특정 모집 게시글 업데이트
export const updateRecruitPost = async (postId: number, updatedData: any) => {
  try {
    const response = await api.put(`${BASE_URL}/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(
      `Error while updating recruit post with ID ${postId}:`,
      error
    );
    throw error;
  }
};

// 특정 모집 게시글 삭제
export const deleteRecruitPost = async (postId: number) => {
  try {
    await api.delete(`${BASE_URL}/${postId}`);
  } catch (error) {
    console.error(
      `Error while deleting recruit post with ID ${postId}:`,
      error
    );
    throw error;
  }
};

// 모집 상태 변경
export const updatePostState = async (postId: string, newState: boolean) => {
  try {
    await api.patch(`${BASE_URL}/${postId}/state?newState=${newState}`);
  } catch (error) {
    console.error(
      `Error while updating state for recruit post with ID ${postId}:`,
      error
    );
    throw error;
  }
};
