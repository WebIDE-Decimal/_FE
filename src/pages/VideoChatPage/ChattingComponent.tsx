import { useRef, useEffect, useState } from "react"; // React 훅 불러오기
import { useSelector } from "react-redux"; // 리덕스 useSelector 불러오기
import ChattingLog from "./ChattingLog"; // ChattingLog 컴포넌트 불러오기

// Chatting 함수 컴포넌트 정의
const ChattingComponent = () => {
  // useRef 훅을 사용하여 DOM 엘리먼트에 접근
  const input = useRef<HTMLInputElement>(null); // input 요소에 대한 ref
  const chattingLog = useRef<HTMLDivElement>(null); // 채팅 로그에 대한 ref

  // useState 훅을 사용하여 상태 관리
  const [chat, setChat] = useState<{
    messageList: { connectionId: string; nickname: string; message: string }[];
    message: string;
  }>({
    messageList: [],
    message: "",
  });

  // useSelector를 사용하여 리덕스 스토어의 상태 조회
  const openvidu = useSelector((state: any) => state.openvidu);

  // useEffect 훅을 사용하여 컴포넌트 생명주기 메서드 대체
  useEffect(() => {
    if (openvidu.publisher) {
      openvidu.session.on("signal:chat", (event: any) => {
        const data = JSON.parse(event.data);
        setChat((prev) => ({
          ...prev,
          messageList: [
            ...prev.messageList,
            {
              connectionId: event.from.connectionId,
              nickname: data.nickname,
              message: data.message,
            },
          ],
        }));
        scrollToBottom();
      });
    }
  }, [openvidu.session]); // openvidu.session이 변경될 때마다 useEffect 실행

  // 입력값 변경 이벤트 핸들러
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChat((prev) => ({
      ...prev,
      message: event.target.value,
    }));
  }

  // 키 입력 이벤트 핸들러
  function handlePresskey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
      event.currentTarget.value = "";
    }
  }

  // 채팅 메시지 전송 함수
  function sendMessage() {
    if (chat.message) {
      const data = {
        message: chat.message,
        nickname: openvidu.myUserName,
      };
      openvidu.publisher.session.signal({
        data: JSON.stringify(data),
        type: "chat",
      });
    }
    setChat((prev) => ({
      ...prev,
      message: "",
    }));
  }

  // 화면 하단으로 스크롤하는 함수
  function scrollToBottom() {
    setTimeout(() => {
      try {
        if (chattingLog.current) {
          chattingLog.current.scrollTop = chattingLog.current.scrollHeight;
        }
      } catch (err) {
        console.error(err);
      }
    }, 20);
  }

  // JSX 반환
  return (
    <div>
      <div>
        <div ref={chattingLog}>
          {chat.messageList.map(({ message, connectionId }, idx) => (
            <ChattingLog
              key={idx}
              textData={{
                myStreamId: openvidu.session.connection.connectionId,
                connectionId: connectionId,
                message: message,
              }}
            ></ChattingLog>
          ))}
        </div>
      </div>
      <div>
        <input
          onChange={handleChange}
          onKeyUp={handlePresskey}
          ref={input}
        ></input>
      </div>
    </div>
  );
};

// Chatting 컴포넌트를 외부로 내보내기
export default ChattingComponent;
