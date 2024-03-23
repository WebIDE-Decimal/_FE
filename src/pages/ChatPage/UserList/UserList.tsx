import React, { useEffect, useState } from "react";
import userImage from "../../../assets/images/def_userInfo.png";
import chatIcon from "../../../assets/images/chatIcon.png";
import { MdMessage } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from "../../../hooks/redux";
import {
  getMemberProfile,
  getUserSessions,
  initializeSession,
  inviteUserToSession,
} from "../../../api/chatAPI";

interface Chat {
  id: string;
  name: string;
  time: string;
}

const UserList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const properties = { customSessionId: "testSession1" };
        const member = await getMemberProfile(user);
        const invite = await inviteUserToSession("testSession1", "2");
        // const test = await getUserSessions("2");
        // console.log(test);
        if (member !== undefined) {
          await initializeSession({ properties, member });
          // const data = await getUserSessions(member.id.toString() || "1"); // 채팅 목록 가져오기
          // setChats(data); // 채팅 목록 업데이트
          // setFilteredChats(data); // 필터된 채팅 목록 업데이트
        }
      } catch (error) {
        console.error("채팅 목록을 불러오는 중 에러 발생:", error);
      }
    };

    fetchChats();
  }, [user]); // user가 변경될 때마다 다시 호출

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const filtered = chats.filter((chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredChats(filtered);
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
        {filteredChats.length === 0 ? (
          <div className="text-center p-4 text-white">
            검색어를 다시 입력하세요
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer ${
                selectedChat === chat.id
                  ? "bg-chatSelectedBg text-white"
                  : "bg-transparent text-chatBorder"
              }`}
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
        )}
      </div>
    </div>
  );
};

export default UserList;
