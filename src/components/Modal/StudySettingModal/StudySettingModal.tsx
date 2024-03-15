import { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { clickStudySettingModal } from "../../../store/postPage/postPageSlice.ts";
import { Link } from "react-router-dom";
import { toggleAlertModal } from "../../../store/modal/modalSlice.ts";

interface StudySettingProps {
  id?: string;
}

const StudySettingModal = ({ id }: StudySettingProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useOnClickOutside(modalRef, () => {
    dispatch(clickStudySettingModal(false));
  });

  const handleRemoveClick = () => {
    dispatch(toggleAlertModal(true));
    dispatch(clickStudySettingModal(false));
  };

  return (
    <div ref={modalRef} className={"fixed z-10 mt-2 bg-white rounded-lg"}>
      <div className={"pr-4 pl-4 py-2"}>
        <Link to={`../../write/${id}`}>
          <p className={"hover:cursor-pointer hover:font-semibold"}>수정하기</p>
        </Link>
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
