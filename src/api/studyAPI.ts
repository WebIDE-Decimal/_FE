import api from "./index";

const BASE_URL = "ide/study";
interface Member {
  id: number;
  email: string;
  nickname: string;
  password: string;
  profileFilename?: string;
  profileFilepath?: string;
  authority: Authority;
}

enum Authority {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

interface RecruitPost {
  id: number;
  writer: Member;
  title: string;
  content: string;
  applied: number;
  recruited: number;
  state: boolean;
  target: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export default RecruitPost;

// 스터디 생성 시 최상위 폴더 생성
const createStudyFromRecruitPost = async (
  recruitPost: RecruitPost
): Promise<string> => {
  try {
    const response = await api.post(`${BASE_URL}`, recruitPost);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create study");
  }
};

// 스터디 상세 정보 조회 및 화면에 표시
const getStudyDetails = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get study details");
  }
};

export { createStudyFromRecruitPost, getStudyDetails };
