import React, { useState } from "react";
import userImage from "../../../assets/images/def_userInfo.png";
// 예시를 위한 팀 유저 목록 데이터
const teamUsers = [
  { id: 1, nickname: "User1", photo: { userImage } },
  { id: 2, nickname: "User2", photo: { userImage } },
  // 추가 유저 데이터...
];

const TeamUsersList = () => {
  const [userRole, setUserRole] = useState(true); // 현재 유저의 역할 상태

  return (
    <div className="flex-col justify-between items-center p-2">
      <div className="flex items-center p-2">
        <img
          src={userImage}
          alt="User Photo"
          className="w-10 h-10 rounded-full mr-2 "
        />
        <div className="text-white">유저 닉네임</div>
      </div>
      {teamUsers.map((user) => (
        <div key={user.id} className="flex justify-between items-center p-2">
          <div className="flex items-center">
            <img
              src={userImage}
              alt="User Photo"
              className="w-10 h-10 rounded-full mr-2 "
            />
            <div className="text-white">{user.nickname}</div>
          </div>
          <div>
            <button className="bg-transparent hover:text-blue-500 text-white font-bold py-1 px-2 rounded mr-2">
              1:1 채팅
            </button>
            {userRole && (
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                강퇴하기
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamUsersList;
