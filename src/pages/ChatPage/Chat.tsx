import React from "react";
import ChatDetail from "./ChatDetail/ChatDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserList from "./UserList/UserList";

const Chat = () => {
  return (
    <div className="flex h-4/5 max-w-4xl mx-auto rounded border border-chatBgBorder">
      <div className="w-2/5 h-full bg-back border-r border-chatBgBorder">
        <UserList />
      </div>
      <div className="flex flex-col w-4/5 ">
        <div className="h-20 flex bg-back items-center border-b border-chatBgBorder">
          <UserInfo />
        </div>
        <div className="flex-auto overflow-auto">
          <ChatDetail />
        </div>
      </div>
    </div>
  );
};

export default Chat;
