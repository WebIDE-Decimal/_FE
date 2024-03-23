import { CSSProperties, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { clickStudySettingModal } from "../../../store/postPage/postPageSlice.ts";
import { useNavigate } from "react-router-dom";
import { toggleAlertModal } from "../../../store/modal/modalSlice.ts";
import api from "../../../api";
import { toast } from "react-toastify";

interface StudySettingProps {
  id?: string;
  modalPosition: { x: number; y: number };
}

const StudySettingModal = ({ id, modalPosition }: StudySettingProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useOnClickOutside(modalRef, () => {
    dispatch(clickStudySettingModal(false));
  });

  const handleRemoveClick = async () => {
    dispatch(toggleAlertModal(true));
    dispatch(clickStudySettingModal(false));
    await api.delete(`/recruit/${Number(id)}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("../../recruit");
        toast.info("모집글이 삭제되었습니다.");
      }
    });
  };

  const handleEditClick = () => {
    navigate(`../../write/${id}`);
    dispatch(clickStudySettingModal(false));
  };

  const modalStyle: CSSProperties = {
    position: "absolute",
    left: `${modalPosition.x}px`,
    top: `${modalPosition.y}px`,
  };

  return (
    <div
      ref={modalRef}
      style={modalStyle}
      className={`z-10 bg-white rounded-lg`}
    >
      <div className={"pr-4 pl-4 py-2"}>
        <p
          onClick={handleEditClick}
          className={"hover:cursor-pointer hover:font-semibold"}
        >
          수정하기
        </p>
        <p
          onClick={handleRemoveClick}
          className={"hover:cursor-pointer hover:font-semibold"}
        >
          삭제하기
        </p>
      </div>
    </div>
  );
};

export default StudySettingModal;
