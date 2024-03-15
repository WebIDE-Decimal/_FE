import React from "react"; // Children 제거
import userImage from "../../../assets/images/def_userInfo.png";
import { GrSend } from "react-icons/gr";

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
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-1 overflow-y-auto">
        {/* 예제 메시지 */}
        <MessageItem isReceived={true} time="02:07 AM">
          <p>받은 내용</p>
        </MessageItem>
        <MessageItem isReceived={false} time="02:07 AM">
          <p>보낸 내용</p>
        </MessageItem>
      </div>
      <div className="p-4 flex justify-center items-center border-t border-chatBgBorder">
        <textarea
          className="w-4/5 p-2 text-white resize-none bg-transparent focus:outline-none"
          rows={2}
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
