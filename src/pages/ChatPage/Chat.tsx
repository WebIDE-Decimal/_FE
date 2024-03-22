import React from "react";
import ChatDetail from "./ChatDetail/ChatDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserList from "./UserList/UserList";

const Chat = () => {
  return (
    <div className="flex md:order-2 mt-16 space-x-3 md:space-x-0 rtl:space-x-reverse mb-2 max-w-5xl mx-auto rounded border border-chatBgBorder">
      <div
        className="w-2/5 h-full bg-back border-r border-chatBgBorder"
        style={{ height: "90vh" }}
      >
        <UserList />
      </div>
      <div className="flex flex-col w-4/5 ">
        <div className="h-20 flex bg-back items-center border-b border-chatBgBorder">
          <UserInfo />
        </div>
        <div className="flex-auto overflow-auto" style={{ height: "82vh" }}>
          <ChatDetail />
        </div>
      </div>
    </div>
  );
};

export default Chat;
