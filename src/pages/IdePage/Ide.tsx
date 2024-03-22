import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import {
  BsFiletypeJs,
  BsFiletypeJava,
  BsFileEarmark,
  BsFileEarmarkFill,
} from "react-icons/bs";
import { Editor } from "./Editor/Editor";
import ChatDetail from "../ChatPage/ChatDetail/ChatDetail";
import TeamUsersList from "./TeamUsersList/TeamUsersList";

interface fileIconProps {
  type: string;
  isSelected: boolean;
}
// 파일 정보를 배열로 정의
const folders = [
  {
    name: "User1",
    isSelected: true,
    files: [{ name: "User1 file.js", type: "js", isSelected: true }],
  },
  {
    name: "User2",
    isSelected: false,
    files: [{ name: "User2 file.java", type: "java", isSelected: false }],
  },
  // 다른 폴더와 파일들...
];
const Ide = () => {
  const [selectedTab, setSelectedTab] = useState("chat");

  // 파일 확장자에 따른 아이콘을 반환하는 함수
  const getFileIcon = (type: string, isSelected: boolean) => {
    switch (type) {
      case "js":
        return isSelected ? <BsFileEarmarkFill /> : <BsFiletypeJs />;
      case "java":
        return <BsFiletypeJava />;
      case "tsx":
        return <BsFileEarmark />;
      default:
        return <BsFileEarmark />;
    }
  };

  return (
    <div className="flex md:order-2 mt-16 space-x-3 md:space-x-0 rtl:space-x-reverse mb-2 mx-auto rounded border border-chatBgBorder">
      <div className="flex h-full w-full mx-auto" style={{ height: "90vh" }}>
        <div className="basis-1/5 bg-roomTreeBg p-4">
          <div className="mb-4 flex items-center gap-2 text-l text-white">
            <FaFolder /> <span>스터디 이름</span>
          </div>
          {folders.map((folder) => (
            <div key={folder.name}>
              <div className="mb-4 flex items-center gap-2 text-m text-white">
                <FaFolder /> <span>{folder.name}</span>
              </div>
              {folder?.files?.map((file) => (
                <div
                  key={file.name}
                  className={`flex items-center mb-2 pl-4 ${file.isSelected ? "bg-gray-200" : "text-white"}`}
                >
                  {getFileIcon(file.type, file.isSelected)}
                  <p className="ml-2">{file.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="basis-3/5 h-full bg-white">
          <Editor />
        </div>
        <div className="basis-1/5 h-full bg-roomTreeBg overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center pt-4 pb-4">
              <div
                onClick={() => setSelectedTab("chat")}
                className={`flex cursor-pointer w-1/3 h-12 items-center justify-center ${selectedTab === "chat" ? "bg-title text-white" : "bg-chatPBg text-white"}`}
              >
                <p>스터디 채팅</p>
              </div>
              <div
                onClick={() => setSelectedTab("users")}
                className={`flex items-center cursor-pointer w-1/3 h-12 justify-center ${selectedTab === "users" ? "bg-title text-white" : "bg-chatPBg text-white"}`}
              >
                참여 목록
              </div>
            </div>
            <div className="flex-auto overflow-auto">
              {selectedTab === "chat" ? <ChatDetail /> : <TeamUsersList />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ide;
