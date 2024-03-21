import React, { useEffect, useState, useRef } from "react";
import { OpenVidu, Session, Publisher, Subscriber } from "openvidu-browser";

interface ChatComponentProps {
  publisher?: Publisher;
  subscriber?: Subscriber;
  session: Session;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  publisher,
  subscriber,
  session,
}) => {
  const [messages, setMessages] = useState<
    Array<{ connectionId: string; nickname: string; message: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle new chat messages
  const handleNewMessage = (event: any) => {
    const data = JSON.parse(event.data);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      },
    ]);
  };

  // Send message
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const messageData = { nickname: "YourNickname", message: inputMessage }; // Replace 'YourNickname' with actual user nickname
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
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.nickname}:</strong> {message.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
