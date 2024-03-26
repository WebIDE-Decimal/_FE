import React, { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import {
  BsFiletypeJs,
  BsFiletypeJava,
  BsFileEarmark,
  BsFileEarmarkFill,
} from "react-icons/bs";
import Editor from "./Editor/Editor";
import ChatDetail from "../ChatPage/ChatDetail/ChatDetail";
import TeamUsersList from "./TeamUsersList/TeamUsersList";
import { useParams } from "react-router-dom";
import { getRecruitPostById } from "../../api/recruitAPI";

interface FileIconProps {
  type: string;
  isSelected: boolean;
}

const Ide = () => {
  const [selectedTab, setSelectedTab] = useState("chat");
  const [post, setPost] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          const postId = parseInt(id);
          const response = await getRecruitPostById(postId);
          console.log(response);
          setPost(response);
        }
      } catch (error) {
        console.error("Error fetching recruit post details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
            {post && (
              <>
                <FaFolder />
                <span>{post[0].title}</span>
              </>
            )}
          </div>
          {/* {post && (
            <div>
              <div className="mb-4 flex items-center gap-2 text-m text-white">
                <FaFolder /> <span>{post.name}</span>
              </div>
              {post?.files?.map((file: any) => (
                <div
                  key={file.name}
                  className={`flex items-center mb-2 pl-4 ${
                    file.isSelected ? "bg-gray-200" : "text-white"
                  }`}
                >
                  {getFileIcon(file.type, file.isSelected)}
                  <p className="ml-2">{file.name}</p>
                </div>
              ))}
            </div>
          )} */}
        </div>
        <div className="basis-3/5 h-full bg-white">
          {typeof id === "string" ? <Editor sessionId={id} /> : null}
        </div>
        <div className="basis-1/5 h-full bg-roomTreeBg overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center pt-4 pb-4">
              <div
                onClick={() => setSelectedTab("chat")}
                className={`flex cursor-pointer w-1/3 h-12 items-center justify-center ${
                  selectedTab === "chat"
                    ? "bg-title text-white"
                    : "bg-chatPBg text-white"
                }`}
              >
                <p>스터디 채팅</p>
              </div>
              <div
                onClick={() => setSelectedTab("users")}
                className={`flex items-center cursor-pointer w-1/3 h-12 justify-center ${
                  selectedTab === "users"
                    ? "bg-title text-white"
                    : "bg-chatPBg text-white"
                }`}
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
