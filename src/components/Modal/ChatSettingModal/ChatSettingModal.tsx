import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAppDispatch } from "../../../hooks/redux";
import { clickChatSettingModal } from "../../../store/chatPage/chatPageSlice";
import { toggleAlertModal } from "../../../store/modal/modalSlice";

interface ChatSettingProps {
  id: string;
}

const ChatSettingModal = ({ id }: ChatSettingProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useOnClickOutside(modalRef, () => {
    dispatch(clickChatSettingModal(false));
  });

  const handleRemoveClick = () => {
    dispatch(toggleAlertModal(true));
    dispatch(clickChatSettingModal(false));
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
