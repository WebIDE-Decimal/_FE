import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clickChatSettingModal } from "../../../store/chatPage/chatPageSlice";
import { toggleAlertModal } from "../../../store/modal/modalSlice";
import { getMemberProfile, leaveSession } from "../../../api/chatAPI";
import { useNavigate } from "react-router-dom";

interface ChatSettingProps {
  id: string;
}

const ChatSettingModal = ({ id }: ChatSettingProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const selectedChat = useAppSelector(
    (state) => state.chatReducer.selectedChat
  );

  useOnClickOutside(modalRef, () => {
    dispatch(clickChatSettingModal(false));
  });

  const handleRemoveClick = async () => {
    try {
      const Member = await getMemberProfile(user);

      if (selectedChat && Member !== undefined && Member.id !== undefined) {
        await leaveSession(selectedChat, Member.id.toString());
        dispatch(toggleAlertModal(true));
        dispatch(clickChatSettingModal(false));
        console.log("User successfully removed from session");
        navigate("/");
      }
    } catch (error) {
      console.error("Error removing user from session:", error);
    }
  };

  return (
    <div ref={modalRef} className="fixed z-10 bg-white rounded-lg">
      <div className="pr-4 pl-4 py-2">
        <p
          onClick={handleRemoveClick}
          className="hover:cursor-pointer hover:font-semibold"
        >
          방 나가기
        </p>
      </div>
    </div>
  );
};

export default ChatSettingModal;
