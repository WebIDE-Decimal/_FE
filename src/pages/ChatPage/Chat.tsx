import React from "react";
import ChatDetail from "./ChatDetail/ChatDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserList from "./UserList/UserList";

const Chat = () => {
  return (
    // 전체 화면을 채우고, 최대 너비는 1200px, 너비는 화면 크기에 따라 변동, 높이는 화면 전체
    <div className="flex h-screen max-w-4xl mx-auto">
      <div className="w-2/5 bg-blue-200">
        <UserList />
      </div>
      <div className="flex flex-col w-4/5 ">
        <div className="h-20 flex bg-blue-500 items-center">
          <UserInfo />
        </div>
        <div className="flex-1 bg-blue-400 overflow-auto">
          <ChatDetail />
        </div>
      </div>
    </div>
  );
};

export default Chat;
