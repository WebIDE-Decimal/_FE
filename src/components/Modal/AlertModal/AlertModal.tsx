import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleAlertModal } from "../../../store/modal/modalSlice";
import { removePost } from "../../../store/posts/posts.slice";
import { toast } from "react-toastify";
import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface AlertModalProps {
  text: string;
  type: string;
  id?: string;
}

const AlertModal = ({ text, type, id }: AlertModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(toggleAlertModal(false));
  };

  const handleOkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (type === "삭제하기") {
      dispatch(removePost(id));
      dispatch(toggleAlertModal(false));
      navigate(`/recruit`);
      toast.info("모집 글이 삭제되었습니다.");
    } else if (type === "회원 탈퇴") {
      toast.info("계정이 삭제되었습니다.");
      navigate(`/`);
      dispatch(toggleAlertModal(false));
    }
  };

  useOnClickOutside(modalRef, () => {
    dispatch(toggleAlertModal(false));
  });

  return (
    <div
      ref={modalRef}
      className="fixed bg-white z-10 flex flex-col rounded-xl justify-center items-center py-4 px-8"
    >
      <div className="my-3">
        <p className="text-xl font-semibold">{text}</p>
      </div>
      <div>
        <button
          onClick={handleOkClick}
          className="px-2 mx-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          {type}
        </button>
        <button
          onClick={handleCancelClick}
          className="px-2 mx-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          취소하기
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
