import React, { useEffect, useState } from "react"; // Children 제거
import userImage from "../../../assets/images/def_userInfo.png";
import { GrSend } from "react-icons/gr";
import { useAppSelector } from "../../../hooks/redux";
import { createConnection } from "../../../api/chatAPI";
import useWebSocketService from "../../../api/WebSocketService";
interface paramProps {
  isReceived: boolean;
  time: string;
  children: React.ReactNode; // children 타입을 ReactNode로 변경
}

// 메시지 아이템을 렌더링하는 컴포넌트
const MessageItem = ({ isReceived, time, children }: paramProps) => {
  const containerClasses = `flex items-center ${isReceived ? "justify-start" : "justify-end"} p-4`;
  const messageClasses = `flex-1 max-w-xs p-3 rounded-br-lg rounded-bl-lg ${isReceived ? "bg-chatPBg rounded-tr-lg text-white" : "bg-title rounded-tl-lg text-white"}`;
  const timeClasses = "text-xs text-chatUserTime";

  return (
    <div className={containerClasses}>
      {isReceived && (
        <img
          className="w-8 h-8 mr-4 rounded-full border border-chatBorder"
          src={userImage}
          alt="User"
        />
      )}
      <div className="flex-1 w-full max-w-64">
        <div className="flex justify-between items-center">
          {isReceived && (
            <div className="text-sm text-chatUserName">유저이름</div>
          )}
          <div className={timeClasses}>{time}</div>
        </div>
        <div className={messageClasses}>{children}</div>
      </div>
      {!isReceived && (
        <img
          className="w-8 h-8 ml-4 rounded-full border border-chatBorder"
          src={userImage}
          alt="User"
        />
      )}
    </div>
  );
};

const ChatDetail = () => {
  const [messageInput, setMessageInput] = useState<string>("");

  const selectedChat = useAppSelector(
    (state) => state.chatReducer.selectedChat
  );
  const [videoChatDto, setVideoChatDto] = useState<any>(undefined);
  useEffect(() => {
    // const connectToChat = async () => {
    //   try {
    //     if (selectedChat) {
    //       const connectionId = await createConnection(
    //         selectedChat,
    //         videoChatDto
    //       );
    //       console.log("Connection created successfully with ID:", connectionId);
    //     }
    //     // 필요한 경우 추가적인 작업 수행
    //   } catch (error) {
    //     console.error("Error creating connection:", error);
    //     // 에러 처리
    //   }
    // };

    // connectToChat(); // connectToChat 함수 호출
    handleChatButton();
  }, [selectedChat, videoChatDto]);

  // 1:1 채팅 버튼 클릭 시
  const handleChatButton = async () => {
    const videoChatDto = {
      properties: {
        id: "ses_efefefef",
        object: "session",
        createdAt: 1538481996019,
        mediaMode: "ROUTED",
        recordingMode: "MANUAL",
        defaultRecordingProperties: {
          name: "MyRecording",
          hasAudio: true,
          hasVideo: true,
          outputMode: "COMPOSED",
          recordingLayout: "BEST_FIT",
          resolution: "1280x720",
          frameRate: 25,
          shmSize: 536870912,
          mediaNode: "media_i-po39jr3e10rkjsdfj",
        },
        customSessionId: selectedChat,
        connections: {
          numberOfElements: 0,
          content: [],
        },
        recording: false,
        broadcasting: false,
        forcedVideoCodec: "VP8",
        allowTranscoding: false,
        mediaNodeId: "media_i-po39jr3e10rkjsdfj",
      },
    };
    if (selectedChat) {
      createConnection(selectedChat, videoChatDto);
    }
  };

  // const stompClient = useWebSocketService();

  // useEffect(() => {
  //   if (stompClient) {
  //     stompClient.activate();
  //   }

  //   return () => {
  //     if (stompClient && stompClient.connected) {
  //       stompClient.deactivate();
  //     }
  //   };
  // }, [stompClient]);

  // // 웹소켓 메시지 수신 및 처리 로직
  // useEffect(() => {
  //   if (!stompClient || !stompClient.connected) {
  //     return;
  //   }

  //   const subscription = stompClient.subscribe(
  //     `/chat/${selectedChat}/chat.getMessages/`,
  //     (message) => {
  //       const newMessage = JSON.parse(message.body);
  //       // 메시지 처리 로직'
  //       console.log(newMessage);
  //     }
  //   );

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [stompClient, selectedChat]);

  // 채팅 입력 및 전송 로직
  // const sendMessage = () => {
  //   if (!stompClient || !stompClient.connected) {
  //     console.error("WebSocket is not connected");
  //     return;
  //   }

  //   stompClient.publish({
  //     destination: `/chat/${selectedChat}/chat.sendMessage/`,
  //     body: JSON.stringify({ message: messageInput }),
  //   });

  //   // 메시지 전송 후 입력창 비우기
  //   setMessageInput("");
  // };
  // const handleInputChange = (event: any) => {
  //   setMessageInput(event.target.value);
  // };
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-1 overflow-y-auto">
        {/* <MessageItem isReceived={true} time="02:07 AM">
          <p>받은 내용</p>
        </MessageItem>
        <MessageItem isReceived={false} time="02:07 AM">
          <p>보낸 내용</p>
        </MessageItem> */}
      </div>
      <div className="p-4 flex justify-center items-center border-t border-chatBgBorder">
        <textarea
          className="w-4/5 p-2 text-white resize-none bg-transparent focus:outline-none"
          rows={2}
          value={messageInput}
          placeholder="메시지를 입력해 주세요..."
        ></textarea>
        <button className="flex items-center gap-2 ml-4 bg-title text-white rounded-lg px-4 py-2">
          <p>Send</p>
          <GrSend />
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
