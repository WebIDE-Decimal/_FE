import React, { useEffect, useState, useRef } from "react";
import { OpenVidu, Session, Publisher, Subscriber } from "openvidu-browser";
import { useAppSelector } from "../../hooks/redux";
import { getMemberProfile } from "../../api/chatAPI";
import userImage from "../../assets/images/def_userInfo.png";
import { GrSend } from "react-icons/gr";
const ChatComponent: React.FC<ChatComponentProps> = ({
  publisher,
  subscriber,
  session,
}) => {
  const [messages, setMessages] = useState<
    Array<{ nickname: string; message: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.user);
  const [member, setMember] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getMemberProfile(user);
        if (data !== undefined) {
          setMember(data?.nickname);
        }
      } catch (error) {
        console.error("채팅 목록을 불러오는 중 에러 발생:", error);
      }
    };

    fetchChats();
  }, [user]); // user가 변경될 때마다 다시 호출

  // Function to handle new chat messages
  const handleNewMessage = (event: any) => {
    const data = JSON.parse(event.data);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        nickname: getNickname(data.from),
        message: data.message,
      },
    ]);
  };

  // Determine nickname based on sender
  const getNickname = (from: string): string => {
    return publisher === from
      ? publisher
      : subscriber === from
        ? subscriber
        : member;
  };

  // Send message
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const messageData = {
        nickname: member,
        message: inputMessage,
      };
      session.signal({
        data: JSON.stringify(messageData),
        type: "chat",
      });
      setInputMessage("");
    }
  };

  // Automatically scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle incoming chat messages
  useEffect(() => {
    session.on("signal:chat", handleNewMessage);

    return () => {
      session.off("signal:chat", handleNewMessage);
    };
  }, [session]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.nickname === member ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.nickname === member
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } rounded-lg p-2 m-1`}
            >
              <strong>{message.nickname}:</strong> {message.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 flex justify-center items-center border-t border-chatBgBorder">
        <textarea
          className="w-4/5 p-2 text-white resize-none bg-transparent focus:outline-none"
          rows={1}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력해 주세요..."
        ></textarea>
        <button
          onClick={sendMessage}
          className="flex items-center gap-2 ml-4 bg-title text-white rounded-lg px-4 py-2"
        >
          <p>Send</p>
          <GrSend />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
