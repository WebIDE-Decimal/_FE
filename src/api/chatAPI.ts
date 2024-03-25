import api from "./index";

const BASE_URL = "chat";
interface Properties {
  [key: string]: any;
}

interface Member {
  id?: number; // Optional으로 설정 (생성 시 자동 생성되므로)
  email: string;
  nickname: string;
  password: string;
  profileFilename?: string; // Optional로 설정
  profileFilepath?: string; // Optional로 설정
  authority: Authority; // Enum 타입
}

enum Authority {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

interface videoChatDto {
  properties: Properties;
  member: Member;
}
// 로그인된 유저 정보 가져오기

export const getMemberProfile = async (user: any) => {
  if (!user || !user.accessToken) {
    console.error("Access token is missing.");
    return; // 토큰이 없으면 요청을 보내지 않고 함수 종료
  }

  try {
    const response = await api.post<Member>(
      `${import.meta.env.VITE_API_URL}users/memberProfile`,
      null,
      {
        headers: {
          access_token: `${user.accessToken}`,
        },
      }
    );
    const loggedInMember: Member = response.data;
    // console.log(loggedInMember);
    return loggedInMember;
  } catch (error) {
    console.error("Error fetching member profile:", error);
  }
};

// 세션 생성
export const initializeSession = async (videoChatDto: videoChatDto) => {
  return api.post(`${BASE_URL}/sessions`, videoChatDto);
};

// 세션 연결
export const createConnection = async (
  sessionId: string,
  videoChatDto: videoChatDto
) => {
  return api.post(
    `${BASE_URL}/sessions/${sessionId}/connections/`,
    videoChatDto
  );
};

// 특정 사용자를 세션 초대
export const inviteUserToSession = async (
  sessionId: string,
  inviteeId: string
) => {
  return api.post(`${BASE_URL}/sessions/${sessionId}/invite/`, null, {
    params: { inviteeId },
  });
};

// 사용자가 연결된 모든 세션 가져오기
export const getUserSessions = async (userId: string) => {
  return api.get(`${BASE_URL}/${userId}/sessions/`);
};
