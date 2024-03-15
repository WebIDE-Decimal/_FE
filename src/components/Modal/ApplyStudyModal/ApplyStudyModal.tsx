import { useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleApplyStudyModal } from "../../../store/modal/modalSlice";
import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

const ApplyStudyModal = () => {
  const dispatch = useAppDispatch();
  const [myIntroduction, setMyIntroduction] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCloseClick = () => {
    dispatch(toggleApplyStudyModal(false));
  };

  useOnClickOutside(modalRef, () => {
    dispatch(toggleApplyStudyModal(false));
  });

  return (
    <div
      ref={modalRef}
      className="fixed flex w-[472px] h-[795px] mt-4 flex-col rounded-xl bg-[#444444] z-10"
    >
      <div className="w-full flex flex-col">
        <div className={"mt-4 mx-4"}>
          <button
            onClick={handleCloseClick}
            className={"w-3 h-3 bg-[#F44336] rounded-full"}
          ></button>
        </div>
        <div className={"px-7"}>
          <div className="flex w-full my-4 items-center">
            <p className="text-3xl font-bold text-[#FFFFFF]/80">
              스터디 지원하기
            </p>
          </div>
          <div>
            <p className="text-xl text-white font-bold mb-4">모집 대상</p>
            <p className="font-medium text-white mb-4">JAVA 스터디원 1/3</p>
          </div>
          <div>
            <p className={"my-4 text-xl mb-4 font-bold text-white"}>
              지원 동기
            </p>
            <textarea
              value={myIntroduction}
              onChange={(e) => setMyIntroduction(e.target.value)}
              className="w-full mb-4 h-[365px] bg-[#333333] p-2 resize-none text-white rounded-lg"
              placeholder="지원 동기를 작성해 주세요."
            />
          </div>
          <div>
            <button className="px-3 bg-darkgreen rounded py-2 text-white font-bold">
              지원하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyStudyModal;
