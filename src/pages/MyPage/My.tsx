import MyInformation from "./MyInformation/MyInformation.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  clickAppliedForStudy,
  clickMyInformation,
  clickProceedingStudy,
  clickRecruitingStudy,
} from "../../store/myPage/viewPage/viewPageSlice.ts";
import AppliedForStudies from "./AppliedForStudies/AppliedForStudies.tsx";
import ProceedingStudies from "./ProceedingStudies/ProceedingStudies.tsx";
import RecruitingStudies from "./RecruitingStudys/RecruitingStudies.tsx";

const My = () => {
  const {
    viewMyInformation,
    viewAppliedForStudy,
    viewProceedingStudy,
    viewRecruitingStudy,
  } = useAppSelector((state) => state.viewPage);
  const dispatch = useAppDispatch();

  const handleMyInfoClick = () => {
    dispatch(clickMyInformation());
  };

  const handleProceedingClick = () => {
    dispatch(clickProceedingStudy());
  };

  const handleRecruitingClick = () => {
    dispatch(clickRecruitingStudy());
  };

  const handleAppliedForStudy = () => {
    dispatch(clickAppliedForStudy());
  };

  return (
    <div className={"w-full h-full flex justify-center items-center mt-14"}>
      <div className={"w-5/6 mt-20"}>
        <div className={"mb-5"}>
          <p className={"text-4xl font-bold text-white ml-2"}>마이 페이지</p>
        </div>
        <div className={"flex my-3 pb-4 border-b-2 border-[#46494E]"}>
          <div>
            <span
              onClick={handleMyInfoClick}
              className={`${viewMyInformation ? "text-white" : "text-[#818181]"} px-4 border-x text-lg border-white font-medium hover:text-white hover:cursor-pointer`}
            >
              나의 정보
            </span>
          </div>
          <div>
            <span
              onClick={handleRecruitingClick}
              className={`${viewRecruitingStudy ? "text-white" : "text-[#818181]"} px-4 text-lg font-medium hover:text-white hover:cursor-pointer`}
            >
              모집중인 스터디
            </span>
          </div>
          <div>
            <span
              onClick={handleAppliedForStudy}
              className={`${viewAppliedForStudy ? "text-white" : "text-[#818181]"} px-4 border-l text-lg border-white font-medium hover:text-white hover:cursor-pointer`}
            >
              내가 신청한 스터디
            </span>
          </div>
          <div>
            <span
              onClick={handleProceedingClick}
              className={`${viewProceedingStudy ? "text-white" : "text-[#818181]"} px-4 border-x text-lg border-white font-medium hover:text-white hover:cursor-pointer`}
            >
              진행중인 스터디
            </span>
          </div>
        </div>
        {viewMyInformation && <MyInformation />}
        {viewAppliedForStudy && <AppliedForStudies />}
        {viewProceedingStudy && <ProceedingStudies />}
        {viewRecruitingStudy && <RecruitingStudies />}
      </div>
    </div>
  );
};

export default My;
