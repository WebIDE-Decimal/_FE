import React from "react";
import { CiCircleMore } from "react-icons/ci";
import userImage from "../../../assets/images/def_userInfo.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clickChatSettingModal } from "../../../store/chatPage/chatPageSlice";
import ChatSettingModal from "../../../components/Modal/ChatSettingModal/ChatSettingModal";
import AlertModal from "../../../components/Modal/AlertModal/AlertModal";
const UserInfo = () => {
  const dispatch = useAppDispatch();
  const { viewChatSettingModal } = useAppSelector((state) => state.chatPage);
  const { viewAlertModal } = useAppSelector((state) => state.modal);

  const showModal = () => {
    dispatch(clickChatSettingModal(true));
  };

  return (
    <div className="flex justify-between items-center w-full bg-transparent p-4">
      {viewAlertModal && (
        <AlertModal
          text={"채팅방에서 나가시겠습니까?"}
          type={"채팅방나가기"}
          id="1"
        />
      )}
      <div className="flex items-center">
        <img className="w-8 h-8 mr-4 rounded-full" src={userImage} alt="User" />
        <div className="text-white">유저 이름</div>
      </div>
      <div onClick={showModal} className="cursor-pointer">
        <CiCircleMore className="text-2xl text-white" />
        {viewChatSettingModal && <ChatSettingModal id="1" />}
      </div>
    </div>
  );
};

export default UserInfo;
