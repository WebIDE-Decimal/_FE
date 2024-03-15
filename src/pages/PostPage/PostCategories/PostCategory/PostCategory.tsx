import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import {
  clickApplyManagement,
  clickRecruitDescription,
  clickStudySettingModal,
} from "../../../../store/postPage/postPageSlice.ts";
import StudySettingModal from "../../../../components/Modal/StudySettingModal/StudySettingModal.tsx";
import React, { useState } from "react";

interface PostCategoryProps {
  text: string;
  id?: string;
}

const PostCategory = ({ text, id }: PostCategoryProps) => {
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const dispatch = useAppDispatch();
  const { viewStudySettingModal } = useAppSelector((state) => state.postPage);

  const handleCategoryClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (text === "모집 내용") {
      dispatch(clickRecruitDescription());
    } else if (text === "지원 관리") {
      dispatch(clickApplyManagement());
    } else {
      const { clientX, clientY } = e;
      const xPosition = clientX - 87 > 0 ? clientX - 87 : 0;
      setModalPosition({ x: xPosition, y: clientY });
      dispatch(clickStudySettingModal(true));
    }
  };

  return (
    <div>
      <div>
        <div className={`${text !== "지원 관리" && "border-x border-white"}`}>
          <span
            onClick={handleCategoryClick}
            className={
              "mx-3 text-lg text-[#818181] font-medium hover:text-[#fdfdfd] hover:cursor-pointer"
            }
          >
            {text}
          </span>
          {viewStudySettingModal && text === "스터디 설정" && (
            <StudySettingModal modalPosition={modalPosition} id={id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
