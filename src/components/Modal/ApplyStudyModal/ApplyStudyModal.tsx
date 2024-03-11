import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleApplyStudyModal } from "../../../store/modal/modalSlice";

const ApplyStudyModal = () => {
  const dispatch = useAppDispatch();
  const [myIntroduction, setMyIntroduction] = useState("");

  const handleCloseClick = () => {
    dispatch(toggleApplyStudyModal(false));
  };

  return (
    <div className="fixed flex flex-col rounded-xl justify-center bg-modal-bg z-10 py-3 px-4 w-1/3">
      <div className="w-full">
        <div className="flex w-full my-1 items-center justify-center">
          <p className="text-3xl font-semibold">스터디 지원하기</p>
          <span
            onClick={handleCloseClick}
            className="absolute right-0 pr-3 text-2xl hover:font-semibold hover:text-white hover:cursor-pointer"
          >
            X
          </span>
        </div>
        <div className="my-2">
          <p className="font-medium text-lg">지원자 닉네임: </p>
        </div>
        <div>
          <p className="font-medium text-lg mb-2">지원자 소개: </p>
          <textarea
            value={myIntroduction}
            onChange={(e) => setMyIntroduction(e.target.value)}
            className="w-full h-36 p-2 resize-none rounded-lg placeholder:text-lg"
            placeholder="지원 계기, 사용 가능한 기술, 경력 등을 알려주세요."
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-4 bg-gold my-6 rounded-lg py-3 text-navy font-semibold text-lg">
          신청하기
        </button>
      </div>
    </div>
  );
};

export default ApplyStudyModal;
