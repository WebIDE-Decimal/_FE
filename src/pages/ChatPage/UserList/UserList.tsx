import React, { useEffect, useState } from "react";
import { getChatsList } from "../../../api/chatAPI";
import userImage from "../../../assets/images/def_userInfo.png";
import chatIcon from "../../../assets/images/chatIcon.png";
import { MdMessage } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const UserList = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChatsList();
        setChats(data);
        setFilteredChats(data); // 초기 상태에서는 모든 chats를 보여줍니다.
      } catch (error) {
        console.error("채팅 목록을 불러오는 중 에러 발생:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const filtered = chats.filter((chat) =>
          chat?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredChats(filtered.length > 0 ? filtered : "no-results");
      } else {
        setFilteredChats(chats);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, chats]);

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <div className="flex-none">
        <div className="flex items-center bg-transparent text-title p-4">
          <img className="w-8 h-8 mr-4" src={chatIcon} alt="Chat Icon" />
          <p className="font-bold text-xl">채팅</p>
        </div>
        <div className="p-0 pl-4 pr-4 flex items-center border rounded-lg ml-4 mr-4 border-chatBorder">
          <CiSearch className="text-chatBorder" />
          <input
            className="ml-2 w-full p-2 text-chatBorder bg-transparent"
            placeholder="이름으로 검색"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center gap-2 pt-4 pl-5 text-chatBorder">
          <MdMessage />
          <div className="">All Messages</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pt-4">
        {filteredChats === "no-results" ? (
          <div className="text-center p-4">검색어를 다시 입력하세요</div>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer ${selectedChat === chat.id ? "bg-chatSelectedBg text-white" : "bg-transparent text-chatBorder"}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <img
                className="w-8 h-8 mr-4 rounded-full border-chatBorder border"
                src={userImage}
                alt="User"
              />
              <div className="flex-1">
                <div>{chat.name}</div>
                <div>{chat.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">대화를 시작해보세요</div>
        )}
      </div>
    </div>
  );
};

export default UserList;
