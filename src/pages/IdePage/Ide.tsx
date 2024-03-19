import React, { useState, useEffect } from "react";
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
import { getAllFolders } from "../../api/ideAPI";

interface File {
  id: number;
  fileName: string;
  conrtent: string;
  folder: Folder;
  type: string;
  isSelected: boolean;
}
interface Folder {
  id: number;
  folderName: string;
  parentFolder: Folder;
  childFolders: Folder[];
  files: File[];
  depth: number;
}

interface FolderProps {
  folderName: string;
  parentFolder: Folder;
  depth: number;
}

const Ide = () => {
  const [selectedTab, setSelectedTab] = useState("chat");
  const [folders, setFolders] = useState<Folder[]>([]);

  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     try {
  //       const fetchedFolders = await getAllFolders();
  //       setFolders(fetchedFolders);
  //     } catch (error) {
  //       console.error("Failed to fetch folders:", error);
  //     }
  //   };

  //   fetchFolders();
  // }, []);

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
    <div className="max-w-9xl mx-auto h-full px-4 sm:px-6 lg:px-8">
      <div className="flex h-full w-full max-w-9xl mx-auto">
        <div className="basis-1/5 bg-roomTreeBg p-4">
          <div className="mb-4 flex items-center gap-2 text-xl text-white">
            <FaFolder /> <span>스터디 이름</span>
          </div>
          {folders.map((folder) => (
            <div key={folder.id}>
              <div className="mb-4 flex items-center gap-2 text-l text-white">
                <FaFolder /> <span>{folder.folderName}</span>
              </div>
              {folder?.files?.map((file) => (
                <div
                  key={file.fileName}
                  className={`flex items-center mb-2 pl-4 ${file.isSelected ? "bg-gray-200" : "text-white"}`}
                >
                  {getFileIcon(file.type, file.isSelected)}
                  <p className="ml-2">{file.fileName}</p>
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
            <div className="flex items-center text-xl justify-center pt-4 pb-4">
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
