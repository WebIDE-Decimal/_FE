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

interface VideoChatDto {
  properties: Properties;
  member: Member;
  isPublisher: boolean;
}

interface ChatMessageDto {
  id: number;
  sessionId: string;
  senderId: string;
  message: string;
}
interface CustomUserDetails {
  member: Member;
  authorities: string[]; // 사용자의 권한을 문자열 배열로 정의합니다.
  password: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
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
export const initializeSession = async (
  videoChatDto: VideoChatDto | undefined,
  customUserDetails: CustomUserDetails
): Promise<string> => {
  try {
    const response = await api.post<string>(
      `${BASE_URL}/sessions`,
      videoChatDto,
      {
        headers: {
          Authorization: `Bearer ${customUserDetails.token}`, // 사용자 토큰을 여기에 삽입해주세요
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("error creating session");
  }
};

// 세션 연결
export const createConnection = async (
  sessionId: string,
  videoChatDto: VideoChatDto | undefined,
  customUserDetails: CustomUserDetails
): Promise<string> => {
  try {
    const response = await api.post<string>(
      `${BASE_URL}/sessions/${sessionId}/connections`,
      videoChatDto,
      {
        headers: {
          Authorization: `Bearer ${customUserDetails.token}`, // 사용자 토큰을 여기에 삽입해주세요
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("error creating connection");
  }
};

// 특정 사용자를 session에 초대(추가)
export const inviteUserToSession = async (
  sessionId: string,
  inviteeId: string
): Promise<void> => {
  try {
    await api.post(
      `${BASE_URL}/sessions/${sessionId}/invite?inviteeId=${inviteeId}`,
      null
    );
  } catch (error) {
    throw new Error("error invite user to session");
  }
};

// 세션에서 사용자를 제거(삭제)
export const leaveSession = async (
  sessionId: string,
  userId: string
): Promise<void> => {
  try {
    await api.delete(
      `${BASE_URL}/sessions/${sessionId}/leave?userId=${userId}`
    );
  } catch (error) {
    throw new Error("Error deleting user in session");
  }
};

// 사용자가 연결된 모든 세션 가져오기
export const getUserSessions = async (
  customUserDetails: CustomUserDetails
): Promise<string[]> => {
  try {
    const response = await api.get<string[]>(`${BASE_URL}/mysessions`, {
      headers: {
        Authorization: `Bearer ${customUserDetails.token}`, // 사용자 토큰을 여기에 삽입해주세요
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error get UserSessions");
  }
};

// 메세지 저장하기
export const sendMessage = async (
  sessionId: string,
  chatMessageDto: ChatMessageDto
): Promise<void> => {
  try {
    await api.post(
      `${BASE_URL}/${sessionId}/chat.sendMessage/`,
      chatMessageDto
    );
  } catch (error) {
    throw new Error("Error sendMessage");
  }
};

// 세션에서 메세지 불러오기
export const getMessages = async (
  sessionId: string
): Promise<ChatMessageDto[]> => {
  try {
    const response = await api.get<ChatMessageDto[]>(
      `${BASE_URL}/${sessionId}/chat.getMessages/`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error getMessages");
  }
};
